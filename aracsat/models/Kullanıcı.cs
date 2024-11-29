public class Kullanıcı
{
    public int id { get; set; } 

    public string ad { get; set; } 
    public string soyad { get; set; } 
    public string email { get; set; } 
    public string Şifre { get; set; } 
    public string rol { get; set; } = "Kullanıcı";

    // Ek özellikler
    public DateTime KayıtTarihi { get; set; } = DateTime.Now; 
    public bool AktifMi { get; set; } = true; 

    // İlişkiler
    public ICollection<Araç> araçlar { get; set; } 
}
