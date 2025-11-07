const ctx = document.getElementById('barchart').getContext('2d');
const barchart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril' , 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
            label: '# Usuários',
            data: [12, 19, 3, 5, 2, 3, 7, 8, 10, 11, 9, 6],
            backgroundColor: [
                'rgb(1, 10, 24)',            // azul escuro
                'rgba(54, 162, 235, 0.7)',   // azul claro
                'rgba(200, 210, 220, 0.8)',  // cinza claro
                'rgb(1, 10, 24)',            // azul escuro
                'rgba(54, 162, 235, 0.7)',   // azul claro
                'rgba(200, 210, 220, 0.8)',  // cinza claro
                'rgb(1, 10, 24)',            // azul escuro
                'rgba(54, 162, 235, 0.7)',   // azul claro
                'rgba(200, 210, 220, 0.8)',  // cinza claro
                'rgb(1, 10, 24)',            // azul escuro
                'rgba(54, 162, 235, 0.7)',   // azul claro
                'rgba(200, 210, 220, 0.8)',  // cinza claro
            ],
            borderColor: [
                'rgb(1, 10, 24)',            // azul escuro
                'rgba(54, 162, 235, 0.7)',   // azul claro
                'rgba(200, 210, 220, 0.8)',  // cinza claro
                'rgb(1, 10, 24)',            // azul escuro
                'rgba(54, 162, 235, 0.7)',   // azul claro
                'rgba(200, 210, 220, 0.8)',  // cinza claro
                'rgb(1, 10, 24)',            // azul escuro
                'rgba(54, 162, 235, 0.7)',   // azul claro
                'rgba(200, 210, 220, 0.8)',  // cinza claro
                'rgb(1, 10, 24)',            // azul escuro
                'rgba(54, 162, 235, 0.7)',   // azul claro
                'rgba(200, 210, 220, 0.8)',  // cinza claro
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



const ctx2 = document.getElementById('doughnut').getContext('2d');
const doughnut = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['Freelancers', 'Denuncias', 'Propostas'],
        datasets: [{
            label: '# os Usuários',
            data: [14, 15, 14 ],
            backgroundColor: [
            'rgb(1, 10, 24)',            // azul escuro
            'rgba(54, 162, 235, 0.7)',   // azul claro
            'rgba(200, 210, 220, 0.8)',  // cinza claro
            
            ],
            borderColor: [
            'rgb(1, 10, 24)',
            'rgba(54, 162, 235, 1)',
            'rgba(200, 210, 220, 1)',
        
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});