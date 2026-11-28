using System.ComponentModel.DataAnnotations;

namespace _31241027164_PhamLeBaoNgoc.Validation;

public class CheckDateGreaterThanTodayAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is not DateTime releaseDate)
        {
            return new ValidationResult(ErrorMessage ?? "Dữ liệu ngày không hợp lệ");
        }

        if (releaseDate.Date > DateTime.Today)
        {
            return ValidationResult.Success;
        }

        return new ValidationResult(ErrorMessage ?? "Dữ liệu ngày phải lớn hơn ngày hôm nay");
    }
}