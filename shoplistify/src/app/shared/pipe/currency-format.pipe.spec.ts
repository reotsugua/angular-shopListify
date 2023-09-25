import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform value with dot to value with comma', () => {
    const valueWithDot = '100.50';
    const transformedValue = pipe.transform(valueWithDot);
    expect(transformedValue).toEqual('100,50');
  });

  it('should handle empty value', () => {
    const transformedValue = pipe.transform('');
    expect(transformedValue).toEqual('');
  });

  it('should handle null value', () => {
    const transformedValue = pipe.transform(null!);
    expect(transformedValue).toEqual('');
  });

  it('should handle undefined value', () => {
    const transformedValue = pipe.transform(undefined!);
    expect(transformedValue).toEqual('');
  });
});
