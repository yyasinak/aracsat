const araclar = [
    { id: 1, marka: "Toyota", model: "Corolla", yil: 2022, fiyat: "450,000 ₺", aciklama: "Az kullanılmış, temiz.", foto: "toyota-corolla.jpg" },
    { id: 2, marka: "BMW", model: "3 Series", yil: 2021, fiyat: "950,000 ₺", aciklama: "Hasarsız, tek el.", foto: "bmw-3series.jpg" },
    { id: 3, marka: "Audi", model: "A4", yil: 2020, fiyat: "800,000 ₺", aciklama: "Full paket, garantili.", foto: "audi-a4.jpg" },
    { id: 4, marka: "Mercedes-Benz", model: "C-Class", yil: 2023, fiyat: "1,200,000 ₺", aciklama: "Sıfır, premium.", foto: "mercedes-c-class.jpg" },
    { id: 5, marka: "Honda", model: "Civic", yil: 2019, fiyat: "600,000 ₺", aciklama: "Düşük km, bakımlı.", foto: "honda-civic.jpg" },
    { id: 6, marka: "Ford", model: "Focus", yil: 2021, fiyat: "550,000 ₺", aciklama: "İkinci el, temiz.", foto: "ford-focus.jpg" },
    { id: 7, marka: "Nissan", model: "Qashqai", yil: 2020, fiyat: "700,000 ₺", aciklama: "SUV, bakımlı.", foto: "nissan-qashqai.jpg" },
    { id: 8, marka: "Volkswagen", model: "Golf", yil: 2022, fiyat: "650,000 ₺", aciklama: "Sıfır araç.", foto: "volkswagen-golf.jpg" },
    { id: 9, marka: "Hyundai", model: "Elantra", yil: 2019, fiyat: "450,000 ₺", aciklama: "Temiz araç.", foto: "hyundai-elantra.jpg" },
    { id: 10, marka: "Kia", model: "Sportage", yil: 2023, fiyat: "1,000,000 ₺", aciklama: "SUV, full paket.", foto: "kia-sportage.jpg" },
    { id: 11, marka: "Peugeot", model: "208", yil: 2021, fiyat: "400,000 ₺", aciklama: "Şehir aracı, ekonomik.", foto: "peugeot-208.jpg" },
    { id: 12, marka: "Renault", model: "Clio", yil: 2022, fiyat: "380,000 ₺", aciklama: "Düşük yakıt tüketimi.", foto: "renault-clio.jpg" },
    { id: 13, marka: "Volvo", model: "XC60", yil: 2023, fiyat: "1,500,000 ₺", aciklama: "Premium SUV.", foto: "volvo-xc60.jpg" },
    { id: 14, marka: "Mazda", model: "CX-5", yil: 2020, fiyat: "850,000 ₺", aciklama: "Yüksek performans.", foto: "mazda-cx5.jpg" },
    { id: 15, marka: "Chevrolet", model: "Camaro", yil: 2018, fiyat: "1,400,000 ₺", aciklama: "Spor araç, yüksek güç.", foto: "chevrolet-camaro.jpg" },
    { id: 16, marka: "Tesla", model: "Model 3", yil: 2023, fiyat: "2,000,000 ₺", aciklama: "Elektrikli, sıfır.", foto: "tesla-model3.jpg" },
    { id: 17, marka: "Porsche", model: "911", yil: 2021, fiyat: "3,000,000 ₺", aciklama: "Lüks spor araba.", foto: "porsche-911.jpg" },
    { id: 18, marka: "Jaguar", model: "F-Pace", yil: 2022, fiyat: "1,800,000 ₺", aciklama: "SUV, zarif tasarım.", foto: "jaguar-fpace.jpg" },
    { id: 19, marka: "Subaru", model: "Outback", yil: 2019, fiyat: "750,000 ₺", aciklama: "Dayanıklı, AWD.", foto: "subaru-outback.jpg" },
    { id: 20, marka: "Lexus", model: "RX", yil: 2022, fiyat: "2,200,000 ₺", aciklama: "Lüks hibrit SUV.", foto: "lexus-rx.jpg" }
];

const araclarContainer = document.getElementById("araclarContainer");

araclar.forEach(arac => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${arac.id}</td>
        <td>${arac.marka}</td>
        <td>${arac.model}</td>
        <td>${arac.yil}</td>
        <td>${arac.fiyat}</td>
        <td>${arac.aciklama}</td>
        <td><img src="${arac.foto}" alt="${arac.marka} ${arac.model}" style="width: 100px;"></td>
    `;
    araclarContainer.appendChild(row);
});


// Filtreleme fonksiyonu
function filtrele() {
    const marka = document.getElementById('marka').value.toLowerCase();
    const model = document.getElementById('model').value.toLowerCase();
    const minFiyat = document.getElementById('minFiyat').value;
    const maxFiyat = document.getElementById('maxFiyat').value;

    const araclarContainer = document.getElementById('araclarContainer');
    araclarContainer.innerHTML = '';  // Filtreleme yapılmadan önce araçlar listesini temizliyoruz

    // Filtrelenmiş araçları döngüyle listeliyoruz
    const filteredAraclar = araclar.filter(arac => {
        return (
            (marka === '' || arac.marka.toLowerCase().includes(marka)) &&
            (model === '' || arac.model.toLowerCase().includes(model)) &&
            (minFiyat === '' || arac.fiyat >= minFiyat) &&
            (maxFiyat === '' || arac.fiyat <= maxFiyat)
        );
    });

    // Filtrelenen araçları sayfada görüntülüyoruz
    filteredAraclar.forEach(arac => {
        const aracRow = document.createElement('tr');
        aracRow.innerHTML = `
            <td>${arac.id}</td>
            <td>${arac.marka}</td>
            <td>${arac.model}</td>
            <td>${arac.yil}</td>
            <td>${arac.fiyat.toLocaleString()}₺</td>
            <td>${arac.aciklama}</td>
            <td><img src="${arac.resim}" alt="${arac.marka} ${arac.model}" width="100"></td>
        `;
        araclarContainer.appendChild(aracRow);
    });
}

// Sayfa ilk yüklendiğinde tüm araçları göster
filtrele();
