import { IAsic } from '../types';

class CalculatorAsics {
  private HOURS_IN_DAY = 24;
  private DAYS_IN_MONTH = 30;
  private WATT = 1000;

  asics: IAsic[];
  electricityCoast: number;

  constructor(asics: IAsic[], electricityCoast: number) {
    this.asics = asics;
    this.electricityCoast = electricityCoast;
  }

  public getTotalConsumption() {
    return this.asics.reduce((total, asic) => {
      return (
        total +
        (asic.watt * asic.count * this.HOURS_IN_DAY * this.DAYS_IN_MONTH) /
          this.WATT
      );
    }, 0);
  }

  public getElectricityConsumption() {
    return this.getTotalConsumption() * this.electricityCoast;
  }

  public getProfitWithoutElectricity() {
    return this.asics.reduce((total, asic) => {
      return total + asic.profitDayAll * asic.count * this.DAYS_IN_MONTH;
    }, 0);
  }
  public getProfitWithElectricity() {
    return (
      this.getProfitWithoutElectricity() -
      this.asics.reduce((total, asic) => {
        return (
          total +
          (asic.watt *
            asic.count *
            this.electricityCoast *
            this.HOURS_IN_DAY *
            this.DAYS_IN_MONTH) /
            this.WATT
        );
      }, 0)
    );
  }

  public getPaybackWithoutElectricity() {
    return this.asics.reduce((total, asic) => {
      return (
        total + (asic.price * asic.count) / this.getProfitWithoutElectricity()
      );
    }, 0);
  }

  public getPaybackWithElectricity() {
    return this.asics.reduce((total, asic) => {
      return (
        total + (asic.price * asic.count) / this.getProfitWithElectricity()
      );
    }, 0);
  }
}

export default CalculatorAsics;
