<!DOCTYPE html>
<html lang="pt-pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Profissional</title>
    <!-- Font Awesome 6 -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
    <!-- Tailwind -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="font-inter bg-gray-100">

    <!-- HEADER -->
    <header class="flex justify-between items-center bg-white h-16 px-6 shadow sticky top-0 z-50">
        <div class="flex items-center space-x-4">
            <img src="./assets/twendy-logo-transparente.png" alt="Logo" class="h-40 w-full">
        </div>

        <div class="flex items-center space-x-4">
            <a href="chat.html" class="text-2xl hover:text-blue-800 transition">
                <i class="fab fa-facebook-messenger"></i>
            </a>
            <div class="relative">
                <button onclick="toggleNotifica()" class="relative text-2xl hover:text-gray-900 transition">
                    <i class="fas fa-bell"></i>
                    <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">17</span>
                </button>
                <div id="box" class="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 hidden">
                    <h2 class="font-semibold mb-2 text-gray-800">Notificações <span class="text-gray-500 font-normal">17</span></h2>
                    <div class="space-y-3 max-h-64 overflow-y-auto">
                        <div class="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded transition">
                            <img src="./assets/131997.jpg" class="w-10 h-10 rounded-full object-cover" alt="">
                            <div>
                                <h4 class="font-semibold text-gray-800">Elias Abdurrahman</h4>
                                <p class="text-gray-500 text-sm">@lorem ipsum dolor sit amet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src="./assets/2.jpg" alt="Avatar" class="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-500 transition">
        </div>
    </header>

    <div class="flex">

        <!-- SIDEBAR -->
        <aside class="w-64 bg-white min-h-screen shadow-lg p-6 hidden md:block">
            <nav class="flex flex-col space-y-2">
                <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 transition text-blue-700 font-medium">
                    <i class="fas fa-home"></i><span>Dashboard</span>
                </a>
                <a href="Post.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition">
                    <i class="fas fa-video"></i><span>Posts</span>
                </a>
                <a href="user.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition">
                    <i class="fas fa-users"></i><span>Usuários</span>
                </a>
                <a href="Bloqueios.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition">
                    <i class="fas fa-user-lock"></i><span>Bloqueados</span>
                </a>
                <a href="Denuncias.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition">
                    <i class="fas fa-exclamation-triangle"></i><span>Denúncias</span>
                </a>
                <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition">
                    <i class="fas fa-lock"></i><span>Alterar senha</span>
                </a>
                <a href="contratar.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition">
                    <i class="fas fa-handshake"></i><span>Contratos</span>
                </a>
                <a href="propostas.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition">
                    <i class="fas fa-users"></i><span>Propostas</span>
                </a>
                <a href="Social-Media.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition">
                    <i class="fas fa-photo-video"></i><span>Mídia</span>
                </a>
                <a href="configuracoes.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition">
                    <i class="fas fa-cog"></i><span>Configurações</span>
                </a>
                <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition">
                    <i class="fas fa-sign-out-alt"></i><span>Sair</span>
                </a>
            </nav>
        </aside>

        <!-- CONTEÚDO PRINCIPAL -->
        <main class="flex-1 p-6 space-y-6">

            <h1 class="text-xl font-bold text-gray-800">Dashboard</h1>

            <!-- CARDS INFO -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white p-8 rounded-md shadow flex items-center justify-between hover:shadow-xl transition">
                    <div>
                        <p class="text-2xl font-bold text-gray-800">100</p>
                        <h3 class="text-gray-500 font-medium">Total Clientes</h3>
                    </div>
                    <i class="fas fa-users text-2xl text-blue-500"></i>
                </div>
                <div class="bg-white p-5 rounded-xl shadow flex items-center justify-between hover:shadow-xl transition">
                    <div>
                        <p class="text-2xl font-bold text-gray-800">75</p>
                        <h3 class="text-gray-500 font-medium">Freelancers</h3>
                    </div>
                    <i class="fas fa-briefcase text-2xl text-green-500"></i>
                </div>
                <div class="bg-white p-5 rounded-xl shadow flex items-center justify-between hover:shadow-xl transition">
                    <div>
                        <p class="text-2xl font-bold text-gray-800">50</p>
                        <h3 class="text-gray-500 font-medium">Negociações</h3>
                    </div>
                    <i class="fas fa-money-bill-alt text-2xl text-yellow-500"></i>
                </div>
                <div class="bg-white p-5 rounded-xl shadow flex items-center justify-between hover:shadow-xl transition">
                    <div>
                        <p class="text-2xl font-bold text-gray-800">20</p>
                        <h3 class="text-gray-500 font-medium">Em Execução</h3>
                    </div>
                    <i class="fas fa-lightbulb text-2xl text-red-500"></i>
                </div>
            </div>

            <!-- GRÁFICOS -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div class="bg-white p-6 rounded-xl shadow">
                    <h3 class="font-semibold text-gray-700 mb-3">Clientes, Freelancers e Negociações</h3>
                    <canvas id="barchart"></canvas>
                </div>
                <div class="bg-white p-6 rounded-xl shadow">
                    <h3 class="font-semibold text-gray-700 mb-3">Distribuição de Negócios</h3>
                    <canvas id="doughnut"></canvas>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div class="bg-white p-6 rounded-xl shadow">
                    <h3 class="font-semibold text-gray-700 mb-3">Posts por Tipo</h3>
                    <canvas id="barchart2"></canvas>
                </div>
                <div class="bg-white p-6 rounded-xl shadow">
                    <h3 class="font-semibold text-gray-700 mb-3">Usuários, Bloqueados e Contratos</h3>
                    <canvas id="barchart3"></canvas>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow w-full mt-6">
                <h3 class="font-semibold text-gray-700 mb-3">Engajamento de Mídia</h3>
                <canvas id="barchart4"></canvas>
            </div>

        </main>
    </div>

    <script>
        function toggleNotifica() {
            const box = document.getElementById('box');
            box.classList.toggle('hidden');
        }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // Gráfico 1: Clientes, Freelancers, Negociações, Em Execução
        const ctx1 = document.getElementById('barchart').getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Clientes', 'Freelancers', 'Negociações', 'Em Execução'],
                datasets: [{
                    label: 'Quantidade',
                    data: [100, 75, 50, 20],
                    backgroundColor: ['#3B82F6','#10B981','#FACC15','#EF4444'],
                    borderRadius: 6
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
        });

        // Gráfico 2: Distribuição de Negócios
        const ctx2 = document.getElementById('doughnut').getContext('2d');
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Em Execução', 'Concluídas', 'Canceladas'],
                datasets: [{
                    data: [20, 25, 5],
                    backgroundColor: ['#EF4444','#10B981','#FBBF24'],
                    hoverOffset: 10
                }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });

        // Gráfico 3: Posts por Tipo
        const ctx3 = document.getElementById('barchart2').getContext('2d');
        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Vídeo', 'Imagem', 'Texto'],
                datasets: [{
                    label: 'Posts',
                    data: [50, 70, 30],
                    backgroundColor: ['#3B82F6','#FBBF24','#10B981'],
                    borderRadius: 6
                }]
            },
            options: { responsive: true }
        });

        // Gráfico 4: Usuários, Bloqueados, Propostas, Contratos
        const ctx4 = document.getElementById('barchart3').getContext('2d');
        new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: ['Usuários', 'Bloqueados', 'Propostas', 'Contratos'],
                datasets: [{
                    label: 'Quantidade',
                    data: [120, 10, 35, 20],
                    backgroundColor: ['#3B82F6','#EF4444','#FBBF24','#10B981'],
                    borderRadius: 6
                }]
            },
            options: { responsive: true }
        });

        // Gráfico 5: Engajamento de Mídia
        const ctx5 = document.getElementById('barchart4').getContext('2d');
        new Chart(ctx5, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
                datasets: [{
                    label: 'Visualizações',
                    data: [200, 400, 300, 500, 450],
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59,130,246,0.2)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } }
        });
    </script>

</body>

</html>
