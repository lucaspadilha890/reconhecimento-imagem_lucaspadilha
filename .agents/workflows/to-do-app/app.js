// app.js – TaskFlow: To-Do App (Vanilla JS + localStorage)
// ──────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ── DB helpers ──────────────────────────────────────────
  const db = {
    getUsers:   () => JSON.parse(localStorage.getItem('users')  || '[]'),
    getTodos:   () => JSON.parse(localStorage.getItem('todos')  || '[]'),
    setUsers:   (v) => localStorage.setItem('users',  JSON.stringify(v)),
    setTodos:   (v) => localStorage.setItem('todos',  JSON.stringify(v)),
    getSession: () => JSON.parse(localStorage.getItem('currentUser') || 'null'),
    setSession: (v) => localStorage.setItem('currentUser', JSON.stringify(v)),
    clearSession: () => localStorage.removeItem('currentUser'),
  };

  // Ensure db keys exist on first load
  if (!localStorage.getItem('users'))  db.setUsers([]);
  if (!localStorage.getItem('todos'))  db.setTodos([]);

  // ── DOM refs ─────────────────────────────────────────────
  const authWrapper      = document.getElementById('auth-wrapper');
  const dashboardScreen  = document.getElementById('dashboard-screen');
  const loginScreen      = document.getElementById('login-screen');
  const registerScreen   = document.getElementById('register-screen');

  const loginForm        = document.getElementById('login-form');
  const registerForm     = document.getElementById('register-form');
  const todoForm         = document.getElementById('todo-form');

  const goRegisterBtn    = document.getElementById('go-register');
  const goLoginBtn       = document.getElementById('go-login');
  const logoutBtn        = document.getElementById('btn-logout');

  const greetingEl       = document.getElementById('greeting');
  const todoListEl       = document.getElementById('todo-list');
  const taskCounterEl    = document.getElementById('task-counter');

  // ── Utilities ────────────────────────────────────────────
  const showErr  = (id, msg) => { const el = document.getElementById(id); el.textContent = msg; el.classList.add('show'); };
  const clearErr = (id)      => { const el = document.getElementById(id); el.textContent = '';  el.classList.remove('show'); };
  const clearAllErrors = (ids) => ids.forEach(clearErr);

  const badgeClass = { Trabalho: 'badge-trabalho', Pessoal: 'badge-pessoal', Estudos: 'badge-estudos' };

  // ── Navigation ───────────────────────────────────────────
  const showLogin    = () => { loginScreen.classList.add('active'); registerScreen.classList.remove('active'); };
  const showRegister = () => { registerScreen.classList.add('active'); loginScreen.classList.remove('active'); };

  const showDashboard = (user) => {
    authWrapper.style.display = 'none';
    dashboardScreen.classList.add('active');
    greetingEl.textContent = `Olá, ${user.name}!`;
    renderTodos();
  };

  const showAuth = () => {
    authWrapper.style.display = '';
    dashboardScreen.classList.remove('active');
    showLogin();
    loginForm.reset();
    registerForm.reset();
    clearAllErrors(['err-login-email','err-login-password','err-login-general',
                    'err-reg-name','err-reg-email','err-reg-password','err-reg-general']);
  };

  goRegisterBtn.addEventListener('click', () => { showRegister(); clearAllErrors(['err-login-email','err-login-password','err-login-general']); });
  goLoginBtn.addEventListener('click',    () => { showLogin();    clearAllErrors(['err-reg-name','err-reg-email','err-reg-password','err-reg-general']); });

  // ── Auth: initial check ──────────────────────────────────
  const boot = () => {
    const session = db.getSession();
    if (session) { showDashboard(session); }
    else         { showAuth(); }
  };

  // ── Auth: Login ──────────────────────────────────────────
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(['err-login-email','err-login-password','err-login-general']);

    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    let ok = true;

    if (!email)    { showErr('err-login-email',    'Informe seu e-mail.');  ok = false; }
    if (!password) { showErr('err-login-password', 'Informe sua senha.'); ok = false; }
    if (!ok) return;

    const users = db.getUsers();
    const user  = users.find(u => u.email === email);
    if (!user)              { showErr('err-login-general', 'E-mail não cadastrado.'); return; }
    if (user.password !== password) { showErr('err-login-general', 'Senha incorreta.'); return; }

    db.setSession({ email: user.email, name: user.name });
    loginForm.reset();
    showDashboard({ email: user.email, name: user.name });
  });

  // ── Auth: Register ───────────────────────────────────────
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(['err-reg-name','err-reg-email','err-reg-password','err-reg-general']);

    const name     = document.getElementById('reg-name').value.trim();
    const email    = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    let ok = true;

    if (!name)            { showErr('err-reg-name',     'Informe seu nome.');              ok = false; }
    if (!email)           { showErr('err-reg-email',    'Informe seu e-mail.');            ok = false; }
    if (password.length < 6) { showErr('err-reg-password', 'Mínimo 6 caracteres.'); ok = false; }
    if (!ok) return;

    const users = db.getUsers();
    if (users.some(u => u.email === email)) { showErr('err-reg-general', 'Este e-mail já está cadastrado.'); return; }

    const newUser = { name, email, password };
    users.push(newUser);
    db.setUsers(users);

    db.setSession({ email, name });
    registerForm.reset();
    showDashboard({ email, name });
  });

  // ── Auth: Logout ─────────────────────────────────────────
  logoutBtn.addEventListener('click', () => { db.clearSession(); showAuth(); });

  // ── Todos: Add ───────────────────────────────────────────
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(['err-todo-title']);

    const title = document.getElementById('todo-title').value.trim();
    const type  = document.getElementById('todo-type').value;
    const desc  = document.getElementById('todo-desc').value.trim();

    if (!title) { showErr('err-todo-title', 'O título é obrigatório.'); return; }

    const session = db.getSession();
    const todos   = db.getTodos();

    todos.push({
      id:          Date.now(),
      userId:      session.email,
      title,
      type,
      description: desc,
      done:        false,
    });

    db.setTodos(todos);
    todoForm.reset();
    renderTodos();
  });

  // ── Todos: Complete ──────────────────────────────────────
  const completeTodo = (id) => {
    const todos = db.getTodos().map(t => t.id === id ? { ...t, done: true } : t);
    db.setTodos(todos);
    renderTodos();
  };

  // ── Todos: Delete ────────────────────────────────────────
  const deleteTodo = (id) => {
    const todos = db.getTodos().filter(t => t.id !== id);
    db.setTodos(todos);
    renderTodos();
  };

  // ── Todos: Render ─────────────────────────────────────────
  const renderTodos = () => {
    const session = db.getSession();
    if (!session) return;

    const all   = db.getTodos().filter(t => t.userId === session.email);
    const active = all.filter(t => !t.done);
    const done   = all.filter(t =>  t.done);
    const sorted = [...active, ...done];

    // Counter
    const doneCount = done.length;
    taskCounterEl.textContent = all.length > 0
      ? `${doneCount}/${all.length} concluídas`
      : '';

    // Empty state
    if (sorted.length === 0) {
      todoListEl.innerHTML = `
        <div class="glass rounded-2xl p-10 text-center">
          <p class="text-4xl mb-3">📋</p>
          <p class="text-slate-300 font-medium">Nenhuma tarefa cadastrada ainda.</p>
          <p class="text-slate-500 text-sm mt-1">Use o formulário acima para adicionar sua primeira tarefa.</p>
        </div>`;
      return;
    }

    todoListEl.innerHTML = sorted.map(t => {
      const badge = badgeClass[t.type] || 'badge-trabalho';
      const descHtml = t.description
        ? `<p class="text-slate-400 text-sm mt-1.5 leading-relaxed">${escHtml(t.description)}</p>`
        : '';

      return `
        <article class="todo-card ${t.done ? 'done-card' : ''}" data-id="${t.id}">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <span class="badge ${badge}">${escHtml(t.type)}</span>
              </div>
              <p class="todo-title font-semibold text-slate-100 text-sm leading-snug">${escHtml(t.title)}</p>
              ${descHtml}
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0 pt-0.5">
              ${!t.done
                ? `<button class="btn-done" data-action="complete" data-id="${t.id}" title="Marcar como concluída">✓ Concluir</button>`
                : `<span class="text-xs text-emerald-500/70 font-semibold">Concluída</span>`
              }
              <button class="btn-del" data-action="delete" data-id="${t.id}" title="Remover tarefa">✕</button>
            </div>
          </div>
        </article>`;
    }).join('');
  };

  // Delegate clicks on task list (complete / delete)
  todoListEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    if (btn.dataset.action === 'complete') completeTodo(id);
    if (btn.dataset.action === 'delete')   deleteTodo(id);
  });

  // ── Helpers ───────────────────────────────────────────────
  const escHtml = (str) =>
    str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  // ── Boot ──────────────────────────────────────────────────
  boot();
});
