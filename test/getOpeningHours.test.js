const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  const open = 'The zoo is open';
  const closed = 'The zoo is closed';
  it('O nome do dia da semana passado como argumento tem que ser em inglês', () => {
    expect(() => getOpeningHours('terça-feira', '05:00-PM')).toThrow();
    expect(getOpeningHours('Wednesday', '04:45-PM')).toBe(open);
  });
  it('O horário precisa ter a seguinte formatação XX:XX-XM', () => {
    expect(() => getOpeningHours('Monday', '09;11-pm')).toThrow();
    expect(() => getOpeningHours('Thursday', '09-pm')).toThrow();
    expect(() => getOpeningHours('Thursday', 'nove horas')).toThrow();
    expect(getOpeningHours('Monday', '09:00-AM')).toBe(closed);
  });
  it('As horas serão validadas na nomenclatura AM e PM', () => {
    expect(() => getOpeningHours('Friday', '08:15-PN')).toThrow();
    expect(() => getOpeningHours('Sunday', '12:00-')).toThrow();
    expect(() => getOpeningHours('Tuesday', '10:00--PM')).toThrow();
    expect(getOpeningHours('Tuesday', '12:00-PM')).toBe(open);
  });
  it('A função não faz diferenciação entre maiúsculas e minúsculas', () => {
    expect(getOpeningHours('Monday', '09:00-Am')).toBe(closed);
    expect(getOpeningHours('Tuesday', '12:00-pM')).toBe(open);
    expect(getOpeningHours('Wednesday', '04:55-pm')).toBe(open);
    expect(getOpeningHours('Saturday', '07:20-pm')).toBe(open);
  });
  it('Valores informados na hora devem respeitar os horários AM/PM', () => {
    expect(() => getOpeningHours('Friday', '08:66-PM')).toThrow();
    expect(() => getOpeningHours('Sunday', '15:00-AM')).toThrow();
    expect(() => getOpeningHours('Monday', '-05:00-PM')).toThrow();
    expect(() => getOpeningHours('Sunday', '-25:100-AM')).toThrow();
  });
  it('Verifica condição de aberto e fechado', () => {
    expect(getOpeningHours('Thursday', '09:00-AM')).toBe(closed);
    expect(getOpeningHours('Monday', '12:00-AM')).toBe(closed);
    expect(getOpeningHours('Thursday', '09:00-AM')).toBe(open);
  });
  it('Retorna o objeto hours quando não é passado parâmetro', () => {
    const expected = {
      Friday: { close: 8, open: 10 },
      Monday: { close: 0, open: 0 },
      Saturday: { close: 10, open: 8 },
      Sunday: { close: 8, open: 8 },
      Thursday: { close: 8, open: 10 },
      Tuesday: { close: 6, open: 8 },
      Wednesday: { close: 6, open: 8 },
    };
    expect(getOpeningHours()).toEqual(expected);
  });
});
