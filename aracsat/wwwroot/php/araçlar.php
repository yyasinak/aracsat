<?php
// PostgreSQL veritabanı bağlantısı
$host = "localhost"; 
$dbname = "araçlar"; // Veritabanı adı
$user = "postgres"; // PostgreSQL kullanıcı adı
$password = "12345678"; // PostgreSQL şifresi

// PDO ile bağlantı sağlanıyor
try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Bağlantı hatası: " . $e->getMessage();
    exit;
}

// Filtreleme işlemi
$marka = isset($_GET['marka']) ? $_GET['marka'] : '';
$model = isset($_GET['model']) ? $_GET['model'] : '';
$fiyat_min = isset($_GET['fiyat_min']) ? $_GET['fiyat_min'] : 0;
$fiyat_max = isset($_GET['fiyat_max']) ? $_GET['fiyat_max'] : 1000000;

// SQL sorgusunu oluştur
$sql = "SELECT id, marka, model, yil, fiyat, aciklama, fotograf FROM araclar WHERE fiyat BETWEEN :fiyat_min AND :fiyat_max";

if ($marka != '') {
    $sql .= " AND marka LIKE :marka";
}

if ($model != '') {
    $sql .= " AND model LIKE :model";
}

// Veritabanı sorgusunu hazırlayın ve çalıştırın
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':fiyat_min', $fiyat_min, PDO::PARAM_INT);
$stmt->bindParam(':fiyat_max', $fiyat_max, PDO::PARAM_INT);

if ($marka != '') {
    $stmt->bindParam(':marka', "%$marka%", PDO::PARAM_STR);
}

if ($model != '') {
    $stmt->bindParam(':model', "%$model%", PDO::PARAM_STR);
}

$stmt->execute();
$araclar = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Araçlar - ARAÇSAT</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="araclar.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div class="container">
            <a class="navbar-brand fw-bold text-warning" href="#">🚗 ARAÇSAT</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Ana Sayfa</a></li>
                    <li class="nav-item"><a class="nav-link" href="hakkimizda.html">Hakkımızda</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Araçlar Başlık -->
    <header class="text-center py-5">
        <h1>Satılık Araçlar</h1>
        <p class="lead">Farklı kategorilerdeki araçlarımızı inceleyin.</p>
    </header>

    <!-- Araç Filtreleme Formu -->
    <section class="container py-5">
        <div class="row mb-4">
            <div class="col-md-3">
                <label for="marka" class="form-label">Marka</label>
                <select class="form-select" id="marka">
                    <option value="">Tüm Markalar</option>
                    <option value="Toyota">Toyota</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                    <!-- Diğer markaları buraya ekleyebilirsiniz -->
                </select>
            </div>
            <div class="col-md-3">
                <label for="model" class="form-label">Model</label>
                <input type="text" class="form-control" id="model" placeholder="Model girin">
            </div>
            <div class="col-md-3">
                <label for="fiyat" class="form-label">Fiyat Aralığı</label>
                <input type="number" class="form-control" id="minFiyat" placeholder="Min. Fiyat">
                <input type="number" class="form-control mt-2" id="maxFiyat" placeholder="Max. Fiyat">
            </div>
            <div class="col-md-3">
                <button class="btn btn-primary mt-4" onclick="filtrele()">Filtrele</button>
            </div>
        </div>
    </section>

    <!-- Araçlar Listesi -->
    <section class="container py-5">
        <div class="row">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Marka</th>
                        <th>Model</th>
                        <th>Yıl</th>
                        <th>Fiyat</th>
                        <th>Açıklama</th>
                        <th>Fotoğraf</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($araclar as $arac): ?>
                        <tr>
                            <td><?php echo $arac['id']; ?></td>
                            <td><?php echo $arac['marka']; ?></td>
                            <td><?php echo $arac['model']; ?></td>
                            <td><?php echo $arac['yil']; ?></td>
                            <td><?php echo $arac['fiyat']; ?>₺</td>
                            <td><?php echo $arac['aciklama']; ?></td>
                            <td><img src="images/<?php echo $arac['fotograf']; ?>" alt="<?php echo $arac['model']; ?>" width="100"></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-3 text-center">
        <p>© 2024 Araç Satış Sitesi. Tüm hakları saklıdır.</p>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
