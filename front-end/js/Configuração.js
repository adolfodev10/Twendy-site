 // keys
        const adminsKey = 'admins_v1';
        const empsKey = 'funcionarios_v1';
        const pwdKey = 'superadmin_pwd';

        // fixed current user: Super Admin
        const currentUser = { role: 'superadmin', name: 'EB20' };

        let admins = JSON.parse(localStorage.getItem(adminsKey) || '[]');
        let employees = JSON.parse(localStorage.getItem(empsKey) || '[]');

        // elements
        const adminsListEl = document.getElementById('adminsList');
        const employeesGrid = document.getElementById('employeesGrid');
        const managementList = document.getElementById('managementList');
        const countEl = document.getElementById('count');
        const superAvatar = document.getElementById('superAvatar');

        // logged panel
        document.getElementById('btnChangePwd').addEventListener('click', () => {
            const cur = localStorage.getItem(pwdKey) || '';
            const newPwd = prompt('Defina nova senha (fictícia) para Super Admin:', cur);
            if (newPwd !== null) { localStorage.setItem(pwdKey, newPwd); alert('Senha atualizada (fictícia).'); }
        });

        // show avatar initials for superadmin
        superAvatar.textContent = initials(currentUser.name);

        // action buttons
        document.getElementById('btnAddAdmin').addEventListener('click', openModalAdminNew);
        document.getElementById('btnAddEmployee').addEventListener('click', openModalEmpNew);
        document.getElementById('btnClear').addEventListener('click', () => {
            if (confirm('Limpar todos os dados (administradores e funcionários)?')) {
                admins = []; employees = []; saveAll(); renderAll();
            }
        });

        // modal admin
        const modalAdmin = document.getElementById('modalAdmin');
        const adminTitle = document.getElementById('adminTitle');
        const adminNome = document.getElementById('adminNome');
        const adminCargo = document.getElementById('adminCargo');
        const adminSalario = document.getElementById('adminSalario');
        const adminImgPreview = document.getElementById('adminImgPreview');
        const adminImgInput = document.getElementById('adminImgInput');
        const adminSaveBtn = document.getElementById('adminSaveBtn');
        const adminCancelBtn = document.getElementById('adminCancelBtn');
        const adminDeleteBtn = document.getElementById('adminDeleteBtn');
        let editingAdminIndex = null;

        // admin modal fields
        const adminBI = document.getElementById('adminBI');
        const adminEmail = document.getElementById('adminEmail');
        const adminTelefone = document.getElementById('adminTelefone');

        // employee modal fields
        const empBI = document.getElementById('empBI');
        const empEmail = document.getElementById('empEmail');
        const empTelefone = document.getElementById('empTelefone');


        // modal employee
        const modalEmp = document.getElementById('modalEmployee');
        const employeeTitle = document.getElementById('employeeTitle');
        const empNome = document.getElementById('empNome');
        const empCargo = document.getElementById('empCargo');
        const empSalario = document.getElementById('empSalario');
        const empImgPreview = document.getElementById('empImgPreview');
        const empImgInput = document.getElementById('empImgInput');
        const empSaveBtn = document.getElementById('empSaveBtn');
        const empCancelBtn = document.getElementById('empCancelBtn');
        const empDeleteBtn = document.getElementById('empDeleteBtn');
        let editingEmpIndex = null;

        // validações
        function hasRepeatedSpecials(s) {
            // encontra qualquer caracter não alfanumérico (exceto espaço) repetido 3 ou mais vezes
            return /([^\w\s])\1{2,}/.test(s);
        }
        function validateImageFile(file) {
            if (!file) return true;
            const limit = 1.5 * 1024 * 1024; // 1.5 MB
            if (file.size > limit) {
                alert('Imagem muito grande. Limite: 1.5 MB.');
                return false;
            }
            return true;
        }

        function toDataURL(file, cb) {
            const reader = new FileReader();
            reader.onload = () => cb(reader.result);
            reader.readAsDataURL(file);
        }

        // admin image input
        adminImgInput.addEventListener('change', (e) => {
            const f = e.target.files[0];
            if (!f) return;
            if (!validateImageFile(f)) { adminImgInput.value = ''; return; }
            toDataURL(f, src => { adminImgPreview.innerHTML = '<img src="' + src + '" style="width:100%;height:100%;object-fit:cover;border-radius:8px">'; adminImgPreview.dataset.src = src; });
        });

        // emp image input
        empImgInput.addEventListener('change', (e) => {
            const f = e.target.files[0];
            if (!f) return;
            if (!validateImageFile(f)) { empImgInput.value = ''; return; }
            toDataURL(f, src => { empImgPreview.innerHTML = '<img src="' + src + '" style="width:100%;height:100%;object-fit:cover;border-radius:8px">'; empImgPreview.dataset.src = src; });
        });

        // admin save
        adminSaveBtn.addEventListener('click', () => {
            // ler campos (inclui BI, email, telefone)
            const nome = adminNome.value.trim();
            const bi = adminBI.value.trim();
            const email = adminEmail.value.trim();
            const telefone = adminTelefone.value.trim();

            // validações
            if (!nome) { alert('Preencha o nome.'); return; }
            if (hasRepeatedSpecials(nome)) { alert('Nome inválido: caracteres especiais repetidos detectados.'); return; }

            const cargo = adminCargo.value.trim() || 'Administrador';
            const salario = Number(adminSalario.value) || 0;
            const image = adminImgPreview.dataset.src || null;

            if (editingAdminIndex === null) {
                // criar novo
                const id = Date.now() + Math.floor(Math.random() * 999);
                const obj = { nome, bi, email, telefone, cargo, salario, image, role: 'admin', id };
                admins.push(obj);
                // também inserir na lista geral de employees (admin como funcionário)
                employees.push({ ...obj });
            } else {
                // atualizar existente
                const old = admins[editingAdminIndex];
                admins[editingAdminIndex] = { ...old, nome, bi, email, telefone, cargo, salario, image };
                // atualizar também na lista de employees, se existir
                const idxE = employees.findIndex(e => e.id === old.id);
                if (idxE !== -1) {
                    employees[idxE] = { ...employees[idxE], nome, bi, email, telefone, cargo, salario, image, role: 'admin' };
                }
            }

            saveAll();
            renderAll();
            closeModalAdmin();
        });



        adminCancelBtn.addEventListener('click', closeModalAdmin);
        adminDeleteBtn.addEventListener('click', () => {
            if (editingAdminIndex === null) return;
            if (!confirm('Apagar este administrador?')) return;
            const id = admins[editingAdminIndex].id;
            admins.splice(editingAdminIndex, 1);
            employees = employees.filter(e => e.id !== id);
            saveAll(); renderAll(); closeModalAdmin();
        });

        function openModalAdminNew() {
            editingAdminIndex = null;
            adminTitle.textContent = 'Novo Administrador';
            adminDeleteBtn.style.display = 'none';
            clearAdminForm();
            showModal(modalAdmin);
        }
        function openModalAdminEdit(idx) {
            editingAdminIndex = idx;
            const a = admins[idx];
            adminTitle.textContent = 'Editar Administrador';
            adminDeleteBtn.style.display = 'inline-block';
            adminNome.value = a.nome;
            adminCargo.value = a.cargo;
            adminSalario.value = a.salario;
            if (a.image) { adminImgPreview.innerHTML = '<img src="' + a.image + '" style="width:100%;height:100%;object-fit:cover;border-radius:8px">'; adminImgPreview.dataset.src = a.image } else { adminImgPreview.innerHTML = '+'; delete adminImgPreview.dataset.src; }
            showModal(modalAdmin);
        }
        function clearAdminForm() {
            adminNome.value = '';
            adminCargo.value = '';
            adminSalario.value = '';
            adminBI.value = '';
            adminEmail.value = '';
            adminTelefone.value = '';
            adminImgPreview.innerHTML = '+';
            delete adminImgPreview.dataset.src;
            adminImgInput.value = '';
        }
        function closeModalAdmin() { modalAdmin.style.display = 'none'; }

        // employee save
        empSaveBtn.addEventListener('click', () => {
            // ler campos (inclui BI, email, telefone)
            const nome = empNome.value.trim();
            const bi = empBI.value.trim();
            const email = empEmail.value.trim();
            const telefone = empTelefone.value.trim();

            // validações
            if (!nome) { alert('Preencha o nome.'); return; }
            if (hasRepeatedSpecials(nome)) { alert('Nome inválido: caracteres especiais repetidos detectados.'); return; }

            const cargo = empCargo.value.trim() || 'Funcionário';
            const salario = Number(empSalario.value) || 0;
            const image = empImgPreview.dataset.src || null;

            if (editingEmpIndex === null) {
                // criar novo funcionário
                const id = Date.now() + Math.floor(Math.random() * 999);
                const obj = { nome, bi, email, telefone, cargo, salario, image, role: 'employee', id };
                employees.push(obj);
            } else {
                // atualizar existente
                const old = employees[editingEmpIndex];
                employees[editingEmpIndex] = { ...old, nome, bi, email, telefone, cargo, salario, image };
                // se esse employee também for admin, atualiza admin correspondente
                const ai = admins.findIndex(a => a.id === old.id);
                if (ai !== -1) {
                    admins[ai] = { ...admins[ai], nome, bi, email, telefone, cargo, salario, image, role: 'admin' };
                }
            }

            saveAll();
            renderAll();
            closeModalEmp();
        });


        empCancelBtn.addEventListener('click', closeModalEmp);
        empDeleteBtn.addEventListener('click', () => {
            if (editingEmpIndex === null) return;
            if (!confirm('Apagar este funcionário?')) return;
            const id = employees[editingEmpIndex].id;
            employees.splice(editingEmpIndex, 1);
            admins = admins.filter(a => a.id !== id);
            saveAll(); renderAll(); closeModalEmp();
        });

        function openModalEmpNew() {
            editingEmpIndex = null;
            employeeTitle.textContent = 'Novo Funcionário';
            empDeleteBtn.style.display = 'none';
            clearEmpForm();
            showModal(modalEmp);
        }
        function openModalEmpEdit(idx) {
            editingEmpIndex = idx;
            const e = employees[idx];
            employeeTitle.textContent = 'Editar Funcionário';
            empDeleteBtn.style.display = 'inline-block';
            empNome.value = e.nome;
            empCargo.value = e.cargo;
            empSalario.value = e.salario;
            if (e.image) { empImgPreview.innerHTML = '<img src="' + e.image + '" style="width:100%;height:100%;object-fit:cover;border-radius:8px">'; empImgPreview.dataset.src = e.image } else { empImgPreview.innerHTML = '+'; delete empImgPreview.dataset.src; }
            showModal(modalEmp);
        }

        function clearEmpForm() {
            empNome.value = '';
            empCargo.value = '';
            empSalario.value = '';
            empBI.value = '';
            empEmail.value = '';
            empTelefone.value = '';
            empImgPreview.innerHTML = '+';
            delete empImgPreview.dataset.src;
            empImgInput.value = '';
        }

        function closeModalEmp() { modalEmp.style.display = 'none'; }

        function showModal(modalEl) { modalEl.style.display = 'flex'; modalEl.querySelector('.modal').style.transform = 'translateY(0)'; }

        // render
        function formatCurrency(v) { return Number(v || 0).toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
        function initials(name) { return (name.split(' ').map(x => x[0]).slice(0, 2).join('') || '??').toUpperCase(); }

        function colorFromString(s) {
            // gera uma cor HSL baseada no hash do nome
            let h = 0;
            for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
            return `hsl(${h} 70% 45%)`;
        }


        // ----- Substitua a função renderAll inteira por esta -----
        function renderAll() {
            // admins sidebar
            adminsListEl.innerHTML = '';
            if (admins.length === 0) {
                adminsListEl.innerHTML = '<div class="small">Nenhum administrador cadastrado.</div>';
            } else {
                admins.forEach((a, idx) => {
                    const div = document.createElement('div');
                    div.className = 'admin-card';
                    // se não tem imagem, deixamos inline style para background (mantendo o que já fazia)
                    const bg = a.image ? '' : `style="background:${colorFromString(a.nome)}"`;
                    div.innerHTML = `
                <div class="avatar" ${bg}>
                    ${a.image
                            ? `<img src="${a.image}" style="width:100%;height:100%;object-fit:cover">`
                            : initials(a.nome)}
                </div>
                <div style="flex:1">
                    <div style="font-weight:700">${a.nome}</div>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                    ${currentUser.role === 'superadmin'
                            ? `<button data-admin-edit="${idx}" class="btn-ghost">Editar</button>
                           <button data-admin-delete="${idx}" class="btn-danger">Apagar</button>`
                            : ''}
                </div>
            `;
                    adminsListEl.appendChild(div);
                });
            }

            // employees grid (includes admins)
            // employees grid (visualização Mocha Pro)
            employeesGrid.innerHTML = '';
            if (employees.length === 0) {
                employeesGrid.innerHTML = '<div class="card-empty-state">Nenhum funcionário cadastrado.</div>';
            } else {
                employees.forEach(emp => {
                    const card = document.createElement('div');
                    card.className = 'employee-card';
                    card.style.padding = '12px';
                    card.style.background = 'rgba(255,255,255,0.02)';
                    card.style.borderRadius = '10px';
                    card.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px">
                <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;background:#081220;flex-shrink:0">
                    ${emp.image
                            ? `<img src="${emp.image}" style="width:100%;height:100%;object-fit:cover">`
                            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700; background:${colorFromString(emp.nome)}">${initials(emp.nome)}</div>`}
                </div>
                <div style="flex:1; display:flex; flex-direction: column; gap:4px">
                    <div style="font-weight:700">${emp.nome}</div>
                    <div class="small">Cargo: ${emp.cargo}</div>
                    <div class="small">Salário: ${formatCurrency(emp.salario)} Kz</div>
                    ${emp.bi ? `<div class="small">BI: ${emp.bi}</div>` : ''}
                    ${emp.email ? `<div class="small">Email: ${emp.email}</div>` : ''}
                    ${emp.telefone ? `<div class="small">Telefone: ${emp.telefone}</div>` : ''}
                </div>
            </div>
        `;
                    employeesGrid.appendChild(card);
                });
            }


            // management list (lado esquerdo / detalhe)
            managementList.innerHTML = '';
            if (employees.length === 0) {
                managementList.innerHTML = '<div class="small">Nenhum funcionário cadastrado.</div>';
            } else {
                employees.forEach((e, idx) => {
                    const d = document.createElement('div');
                    d.className = 'employee';
                    d.innerHTML = `
                <div style="width:56px;height:56px;border-radius:8px;overflow:hidden;background:#081220;flex-shrink:0">
                    ${e.image ? `<img src="${e.image}" style="width:100%;height:100%;object-fit:cover">` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;background:${colorFromString(e.nome)}">${initials(e.nome)}</div>`}
                </div>
                <div class="meta">
                    <div style="font-weight:700">${e.nome}</div>
                    <div class="small">${e.cargo} — ${formatCurrency(e.salario)} Kz</div>
                </div>
                <div class="actions">
                    ${currentUser.role === 'superadmin' ? `<button data-man-edit="${idx}" class="btn-ghost">Editar</button><button data-man-delete="${idx}" class="btn-danger">Apagar</button>` : ''}
                </div>
            `;
                    managementList.appendChild(d);
                });
            }

            // garante que os handlers por delegação fiquem ativos (não depende de elementos já existentes)
            attachHandlers();
            countEl.textContent = employees.length + (employees.length === 1 ? ' funcionário' : ' funcionários');
        }


        // ----- Substitua a função attachHandlers inteira por esta (delegation) -----
        function attachHandlers() {
            // Remove listeners anteriores (se existirem) para evitar duplicação
            adminsListEl.onclick = null;
            employeesGrid.onclick = null;
            managementList.onclick = null;

            // Delegation para admins (editar / apagar)
            adminsListEl.addEventListener('click', (ev) => {
                const btnEdit = ev.target.closest('[data-admin-edit]');
                if (btnEdit) {
                    const idx = parseInt(btnEdit.getAttribute('data-admin-edit'), 10);
                    openModalAdminEdit(idx);
                    return;
                }
                const btnDel = ev.target.closest('[data-admin-delete]');
                if (btnDel) {
                    const idx = parseInt(btnDel.getAttribute('data-admin-delete'), 10);
                    if (confirm('Apagar este administrador?')) {
                        const id = admins[idx].id;
                        admins.splice(idx, 1);
                        employees = employees.filter(e => e.id !== id);
                        saveAll(); renderAll();
                    }
                    return;
                }
            });

            // Delegation para employees grid (editar / apagar)
            employeesGrid.addEventListener('click', (ev) => {
                const btnEdit = ev.target.closest('[data-emp-edit]');
                if (btnEdit) {
                    const idx = parseInt(btnEdit.getAttribute('data-emp-edit'), 10);
                    openModalEmpEdit(idx);
                    return;
                }
                const btnDel = ev.target.closest('[data-emp-delete]');
                if (btnDel) {
                    const idx = parseInt(btnDel.getAttribute('data-emp-delete'), 10);
                    if (confirm('Apagar este funcionário?')) {
                        const id = employees[idx].id;
                        employees.splice(idx, 1);
                        admins = admins.filter(a => a.id !== id);
                        saveAll(); renderAll();
                    }
                    return;
                }
            });

            // Delegation para management list (editar / apagar)
            managementList.addEventListener('click', (ev) => {
                const btnEdit = ev.target.closest('[data-man-edit]');
                if (btnEdit) {
                    const idx = parseInt(btnEdit.getAttribute('data-man-edit'), 10);
                    openModalEmpEdit(idx);
                    return;
                }
                const btnDel = ev.target.closest('[data-man-delete]');
                if (btnDel) {
                    const idx = parseInt(btnDel.getAttribute('data-man-delete'), 10);
                    if (confirm('Apagar este funcionário?')) {
                        const id = employees[idx].id;
                        employees.splice(idx, 1);
                        admins = admins.filter(a => a.id !== id);
                        saveAll(); renderAll();
                    }
                    return;
                }
            });
        }



        function saveAll() { localStorage.setItem(adminsKey, JSON.stringify(admins)); localStorage.setItem(empsKey, JSON.stringify(employees)); }

        // seed (apenas se vazio)
        function seedIfEmpty() {
            if (admins.length === 0 && employees.length === 0) {
                const a1 = { nome: 'Joana Silva', cargo: 'Administradora', salario: 80000, image: null, role: 'admin', id: Date.now() + 1 };
                const e1 = { nome: 'Ana Pereira', cargo: 'RH', salario: 80000, image: null, role: 'employee', id: Date.now() + 2 };
                const e2 = { nome: 'Miguel Costa', cargo: 'Financeiro', salario: 120000, image: null, role: 'employee', id: Date.now() + 3 };
                admins = [a1];
                employees = [e1, e2, { ...a1 }];
                saveAll();
            }
        }

        // keyboard + outside click to close
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { modalAdmin.style.display = 'none'; modalEmp.style.display = 'none'; }
        });
        document.querySelectorAll('.modal-backdrop').forEach(md => {
            md.addEventListener('click', (ev) => { if (ev.target === md) md.style.display = 'none'; });
        });

        // initialize
        seedIfEmpty();
        renderAll();