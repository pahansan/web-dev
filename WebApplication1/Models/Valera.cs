using Microsoft.Extensions.FileProviders;

namespace WebApplication1.Models
{
    public class Valera
    {
        public int Id { get; set; }
        public int Health { get; private set; }
        public int Mana { get; private set; }
        public int Happiness { get; private set; }
        public int Tiredness { get; private set; }
        public int Money { get; private set; }

        private const int MinHealth = 0;
        private const int MaxHealth = 100;
        private const int MinMana = 0;
        private const int MaxMana = 100;
        private const int MinHappiness = -10;
        private const int MaxHappiness = 10;
        private const int MinTiredness = 0;
        private const int MaxTiredness = 100;

        public Valera()
        {
            Health = 100;
            Mana = 0;
            Happiness = 0;
            Tiredness = 0;
            Money = 100;
        }
        private void DownHealth(int diff)
        {
            Health = Math.Max(MinHealth, Health - diff);
        }
        private void UpHealth(int diff)
        {
            Health = Math.Min(MaxHealth, Health + diff);
        }
        private void DownMana(int diff)
        {
            Mana = Math.Max(MinMana, Mana - diff);
        }
        private void UpMana(int diff)
        {
            Mana = Math.Min(MaxMana, Mana + diff);
        }
        private void DownHappiness(int diff)
        {
            Happiness = Math.Max(MinHappiness, Happiness - diff);
        }
        private void UpHappiness(int diff)
        {
            Happiness = Math.Min(MaxHappiness, Happiness + diff);
        }
        private void DownTiredness(int diff)
        {
            Tiredness = Math.Max(MinTiredness, Tiredness - diff);
        }
        private void UpTiredness(int diff)
        {
            Tiredness = Math.Min(MaxTiredness, Tiredness + diff);
        }
        private void DownMoney(int diff)
        {
            Money -= diff;
        }
        private void UpMoney(int diff)
        {
            Money += diff;
        }
        public bool GoWork()
        {
            if (Mana < 50 && Tiredness < 10)
            {
                DownHappiness(5);
                DownMana(30);
                UpMoney(100);
                UpTiredness(70);
                return true;
            }
            return false;
        }
        public void LookForNature()
        {
            UpHappiness(1);
            DownMana(10);
            UpTiredness(10);
        }
        public void DrinkWineAndWatchTV()
        {
            DownHappiness(1);
            UpMana(30);
            UpTiredness(10);
            DownHealth(5);
            DownMoney(20);
        }
        public void GoToBar()
        {
            UpHappiness(1);
            UpMana(60);
            UpTiredness(40);
            DownHealth(10);
            DownMoney(100);
        }
        public void DrinkWithMarginals()
        {
            UpHappiness(5);
            DownHealth(80);
            UpMana(90);
            UpTiredness(80);
            DownMoney(150);
        }
        public void SingInSubway()
        {
            if (Mana > 40 && Mana < 70)
                UpMoney(50);
            UpHappiness(1);
            UpMana(10);
            UpMoney(10);
            UpTiredness(20);
        }
        public void Sleep()
        {
            if (Mana < 30)
                UpHealth(90);
            if (Mana > 70)
                DownHappiness(3);
            DownMana(50);
            DownTiredness(70);
        }
    }
}

