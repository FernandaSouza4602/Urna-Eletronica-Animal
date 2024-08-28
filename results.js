Chart.register(ChartDataLabels);

document.addEventListener('DOMContentLoaded', function() {
    // Get the votes from localStorage
    const votes = JSON.parse(localStorage.getItem('votes')) || {};
    console.log('Votes from localStorage:', votes); // Debugging line

    const candidates = {
        "11": { name: "Macaquias Macaco" },
        "22": { name: "Genésio Lobo-Guará" },
        "33": { name: "Tamandaré Tamanduá" },
        "44": { name: "Vaca Vivoca" },
        "55": { name: "Pedro Preguiça" },
        "66": { name: "Iracema Siriema" },
        "77": { name: "Tião Leão" }
    };

    // Get the candidate names and vote counts, even if its zero
    const candidateIds = Object.keys(candidates);
    const candidateNames = candidateIds.map(id => candidates[id].name);
    const voteCounts = candidateIds.map(id => votes[id] || 0);

    // Get the canvas context
    const ctx = document.getElementById('voteChart').getContext('2d');

    console.log('Vote Counts:', voteCounts);
    console.log('Candidate Names:', candidateNames);


    // Create the chart
    const voteChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: candidateNames,
            datasets: [{
                label: '# of Votes',
                data: voteCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            indexAxis: 'y',
            layout: {
                padding: {
                    right: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    display: true,
                    color: '#000',
                    align: 'end',
                    anchor: 'end',
                    font: {
                        size: 50,
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        return value;
                    },
                    clip: false,
                    offset: 10
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 18
                        },
                        color: '#333',
                        display: false
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 18
                        },
                        color: '#333'
                    }
                }
            }
        }
    });

    // Reset votes to start a new election
    document.addEventListener('keydown', function(event) {
        if (event.key === 'L') {
            const resetVotes = candidateIds.reduce((acc, id) => {
                acc[id] = 0;
                return acc;
            }, {});
            // Save reset votes to localStorage
            localStorage.setItem('votes', JSON.stringify(resetVotes));
            // Reload the page to reflect the changes
            window.location.reload();
        }
    });
});
