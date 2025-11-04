namespace ValeraSan.DTOs;

public class CreateRequest
{
    public string Name { get; set; } = default!;
    public ValeraState State { get; set; } = default!;
}
