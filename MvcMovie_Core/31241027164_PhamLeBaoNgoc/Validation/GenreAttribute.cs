using System.ComponentModel.DataAnnotations;
using _31241027164_PhamLeBaoNgoc.Data;

namespace _31241027164_PhamLeBaoNgoc.Validation;

public class GenreAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value == null)
        {
            return ValidationResult.Success;
        }

        if (!int.TryParse(value.ToString(), out int genreID))
        {
            return new ValidationResult(ErrorMessage ?? "Genre không hợp lệ");
        }

        var context = validationContext.GetService(typeof(ApplicationDbContext)) as ApplicationDbContext;
        if (context == null)
        {
            return ValidationResult.Success;
        }

        if (context.Genres.Any(x => x.ID == genreID))
        {
            return ValidationResult.Success;
        }

        return new ValidationResult(ErrorMessage ?? "Genre không tồn tại");
    }
}