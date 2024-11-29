using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class AraçlarController : Controller
{
    private readonly AppDbContext _context;

    public AraçlarController(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var araçlar = await _context.Araçlar.Include(a => a.Kullanıcı).ToListAsync();
        return View(araçlar);
    }

    public IActionResult Yeni()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Yeni(Araç araç)
    {
        if (ModelState.IsValid)
        {
            _context.Araçlar.Add(araç);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(araç);
    }
}
