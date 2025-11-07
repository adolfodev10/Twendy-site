const ctxBar4 = document.getElementById('barchart4');
if (ctxBar4) {
    const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const negadas =   [2,  5,  1,  3,  2,  1,  2,  4,  1,  3,  2,  1];
    const pendentes = [5, 10,  4,  6,  5,  2,  4,  8,  3,  7,  6,  2];
    const aceitas =   [10, 23,  9, 11, 11,  5, 10, 12,  6, 18, 22,  9];

    new Chart(ctxBar4.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Denuncias Negadas',
                    data: negadas,
                    backgroundColor: 'rgb(1, 10, 24)',           // azul escuro
                    borderColor: 'rgb(1, 10, 24)',
                    borderWidth: 1
                },
                {
                    label: 'Denuncias Pendentes',
                    data: pendentes,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',  // azul claro
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Denuncias Resolvidas',
                    data: aceitas,
                    backgroundColor: 'rgba(200, 210, 220, 0.8)', // cinza claro
                    borderColor: 'rgba(200, 210, 220, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        }
                    }
                }
            },
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}