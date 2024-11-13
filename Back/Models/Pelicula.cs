namespace Models;

public class Pelicula : ElementoCine
{
    public static int nextId = 1;
    public string Director { get; set; }
    public string Sinopsis { get; set; }
    public double Duracion { get; set; } 
    public DateTime FechaEstreno { get; set; }
    public string Genero { get; set; }

    public Pelicula(int id, string nombre, string director, string sinopsis, double duracion, DateTime fechaestreno, string genero) 
        : base(id, nombre)
    {
        Id = nextId++;
        Director = director;
        Sinopsis = sinopsis;
        Duracion = duracion;
        FechaEstreno = fechaestreno;
        Genero = genero;
    }

    public override void MostrarDetalles()
    {
        Console.WriteLine($"Pelicula: {Nombre}, Director: {Director}, Sinopsis: {Sinopsis}, Duración: {Duracion} minutos, Fecha Estreno: {FechaEstreno}, Género: {Genero}");
    }
}
