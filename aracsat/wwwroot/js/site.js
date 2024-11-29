// Araç verilerini (örnek) manuel olarak oluşturduk
const vehicles = [
    { id: 1, marka: 'BMW', model: 'X5', fiyat: 450000, aciklama: '2018 model, temiz araç.' },
    { id: 2, marka: 'Audi', model: 'A4', fiyat: 700000, aciklama: '2017 model, geniş iç hacim.' },
    { id: 3, marka: 'Mercedes', model: 'E Class', fiyat: 1200000, aciklama: '2020 model, üst düzey özellikler.' },
    { id: 4, marka: 'Volkswagen', model: 'Golf', fiyat: 300000, aciklama: '2019 model, ekonomik.' },
    { id: 5, marka: 'Toyota', model: 'Corolla', fiyat: 350000, aciklama: '2021 model, düşük kilometre.' }
];

// HTML'de araçları dinamik olarak göstermek için fonksiyon
function renderVehicles(filteredVehicles) {
    const vehicleContainer = document.querySelector('#vehicles .row');
    vehicleContainer.innerHTML = ''; // Her render işleminden önce sıfırla

    // Filtrelenen araçları ekle
    filteredVehicles.forEach(vehicle => {
        const vehicleCard = document.createElement('div');
        vehicleCard.classList.add('col-md-4', 'mb-4');
        vehicleCard.innerHTML = `
            <div class="card">
                <img src="images/car${vehicle.id}.jpg" class="card-img-top" alt="Araç Resmi">
                <div class="card-body">
                    <h5 class="card-title">${vehicle.marka} ${vehicle.model}</h5>
                    <p class="card-text">${vehicle.aciklama}</p>
                    <p class="card-text"><strong>${vehicle.fiyat.toLocaleString()}₺</strong></p>
                </div>
            </div>
        `;
        vehicleContainer.appendChild(vehicleCard);
    });
}

// Araçları arama ve fiyat filtreleme
function filterVehicles() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const priceFilter = document.getElementById('priceFilter').value;

    // Fiyat filtreleri
    let filteredVehicles = vehicles.filter(vehicle => {
        // Arama filtresi
        const matchesSearch = vehicle.marka.toLowerCase().includes(searchInput) || vehicle.model.toLowerCase().includes(searchInput);
        
        // Fiyat filtresi
        let matchesPrice = true;
        if (priceFilter === 'low') {
            matchesPrice = vehicle.fiyat <= 500000;
        } else if (priceFilter === 'medium') {
            matchesPrice = vehicle.fiyat > 500000 && vehicle.fiyat <= 1000000;
        } else if (priceFilter === 'high') {
            matchesPrice = vehicle.fiyat > 1000000;
        }

        return matchesSearch && matchesPrice;
    });

    // Filtrelenmiş araçları render et
    renderVehicles(filteredVehicles);
}

// Sayfa yüklendiğinde ilk render işlemi
window.onload = function() {
    renderVehicles(vehicles);
};

// Arama ve fiyat filtresi değiştiğinde filtreleme işlemi
document.getElementById('searchInput').addEventListener('input', filterVehicles);
document.getElementById('priceFilter').addEventListener('change', filterVehicles);
