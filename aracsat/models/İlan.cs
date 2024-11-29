public class İlan
{
    public int id { get; set; } // Birincil Anahtar

    // Araç ile ilişki
    public int araçid { get; set; } // İlişki için Araç ID
    public Araç araç { get; set; } // Araç ile birebir ilişki

    // İlan özellikleri
    public DateTime yayınlanmaTarihi { get; set; } = DateTime.Now; // Varsayılan olarak şimdiki tarih
    public bool durum { get; set; } = true; // İlan aktif mi (true) yoksa pasif mi (false)
    public decimal fiyat { get; set; } // İlan fiyatı
    public string açıklama { get; set; } // İlan açıklaması

    // İlan kategorisi (isteğe bağlı ek özellik)
    public string kategori { get; set; } // Araç kategorisini belirten bilgi
}
