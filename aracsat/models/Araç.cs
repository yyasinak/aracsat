
public class Araç
{
    public int ID { get; set; } 


    public string marka { get; set; } 
    public string model { get; set; } 
    public int yıl { get; set; } 
    public decimal fiyat { get; set; } 
    public string açıklama { get; set; } 
    public string Fotoğraf { get; set; } 

   
    public int Kullanıcıid { get; set; } 
    public Kullanıcı Kullanıcı { get; set; } 

    public ICollection<İlan> İlanlar { get; set; } 

    public string kategori { get; set; } 
    public bool durum { get; set; } = true; 
}
