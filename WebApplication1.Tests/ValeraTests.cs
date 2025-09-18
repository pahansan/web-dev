using WebApplication1.Models;
using Xunit;

namespace WebApplication1.Tests
{
    public class ValeraTests
    {
        [Fact]
        public void Constructor_ShouldInitializeWithDefaults()
        {
            var valera = new Valera();

            Assert.Equal(100, valera.Health);
            Assert.Equal(0, valera.Mana);
            Assert.Equal(0, valera.Happiness);
            Assert.Equal(0, valera.Tiredness);
            Assert.Equal(100, valera.Money);
        }

        [Fact]
        public void GoWork_ShouldSucceed_WhenManaLowAndTirednessLow()
        {
            var valera = new Valera();

            var result = valera.GoWork();

            Assert.True(result);
            Assert.Equal(200, valera.Money);
            Assert.Equal(70, valera.Tiredness);
            Assert.Equal(-5, valera.Happiness);
            Assert.Equal(0, valera.Mana);
        }

        [Fact]
        public void GoWork_ShouldFail_WhenConditionsNotMet()
        {
            var valera = new Valera();
            valera.DrinkWineAndWatchTV();

            var result = valera.GoWork();

            Assert.False(result);
            Assert.Equal(80, valera.Money);
        }

        [Fact]
        public void LookForNature_ShouldChangeStats()
        {
            var valera = new Valera();

            valera.LookForNature();

            Assert.Equal(1, valera.Happiness);
            Assert.Equal(100, valera.Money);
            Assert.Equal(0, valera.Mana);
            Assert.Equal(10, valera.Tiredness);
        }

        [Fact]
        public void DrinkWineAndWatchTV_ShouldApplyCorrectChanges()
        {
            var valera = new Valera();

            valera.DrinkWineAndWatchTV();

            Assert.Equal(-1, valera.Happiness);
            Assert.Equal(30, valera.Mana);
            Assert.Equal(10, valera.Tiredness);
            Assert.Equal(95, valera.Health);
            Assert.Equal(80, valera.Money);
        }

        [Fact]
        public void GoToBar_ShouldApplyCorrectChanges()
        {
            var valera = new Valera();

            valera.GoToBar();

            Assert.Equal(1, valera.Happiness);
            Assert.Equal(60, valera.Mana);
            Assert.Equal(40, valera.Tiredness);
            Assert.Equal(90, valera.Health);
            Assert.Equal(0, valera.Money);
        }

        [Fact]
        public void DrinkWithMarginals_ShouldApplyCorrectChanges()
        {
            var valera = new Valera();

            valera.DrinkWithMarginals();

            Assert.Equal(5, valera.Happiness);
            Assert.Equal(20, valera.Health);
            Assert.Equal(90, valera.Mana);
            Assert.Equal(80, valera.Tiredness);
            Assert.Equal(-50, valera.Money);
        }

        [Fact]
        public void SingInSubway_ShouldIncreaseMoneyAndStats()
        {
            var valera = new Valera();

            valera.DrinkWineAndWatchTV();
            valera.DrinkWineAndWatchTV();

            valera.SingInSubway();

            Assert.Equal(-1, valera.Happiness);
            Assert.Equal(70, valera.Mana);
            Assert.Equal(40, valera.Tiredness);
            Assert.Equal(120, valera.Money);
        }

        [Fact]
        public void Sleep_ShouldRestoreHealthAndReduceTiredness_WhenManaLow()
        {
            var valera = new Valera();
            valera.DrinkWineAndWatchTV();
            valera.DrinkWineAndWatchTV();
            valera.DrinkWineAndWatchTV();

            valera.Sleep();

            Assert.True(valera.Health <= 100);
            Assert.True(valera.Tiredness <= 40);
            Assert.True(valera.Mana <= 40);
        }

        [Fact]
        public void Stats_ShouldNeverExceedBoundaries()
        {
            var valera = new Valera();


            for (int i = 0; i < 10; i++)
            {
                valera.DrinkWithMarginals();
                valera.Sleep();
            }

            Assert.InRange(valera.Health, 0, 100);
            Assert.InRange(valera.Mana, 0, 100);
            Assert.InRange(valera.Happiness, -10, 10);
            Assert.InRange(valera.Tiredness, 0, 100);

        }
    }
}
