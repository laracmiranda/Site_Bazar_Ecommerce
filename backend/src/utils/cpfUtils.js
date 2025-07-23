// src/utils/cpfUtils.js
export const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
  
    if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
    const calcularDV = (base) => {
      let soma = 0;
      for (let i = 0; i < base.length; i++) {
        soma += Number(base[i]) * (base.length + 1 - i);
      }
      const resto = soma % 11;
      return resto < 2 ? '0' : String(11 - resto);
    };
  
    const dv1 = calcularDV(cpf.slice(0, 9));
    const dv2 = calcularDV(cpf.slice(0, 9) + dv1);
  
    return cpf === cpf.slice(0, 9) + dv1 + dv2;
  };
  