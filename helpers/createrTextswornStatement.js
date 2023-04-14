const createrTextSwornStatement = (firstAnswer, secondAnswer, thirdAnswer) => {
  return `
    <p>
        ¿Usted consumió bebidas alcohólicas en las últimas 12 horas?
        ${firstAnswer} 
        <br />
        ¿Usted está haciendo uso de medicamentos psicoactivos? (Antigripales, ansiolíticos, antidepresivos, sedantes y/o antialérgicos)
        ${secondAnswer}
        <br />
        ¿Tiene usted algun problema familiar, emocional o de cualquier tipo que lo distraiga?
        ${thirdAnswer}
    </p>`;
};

module.exports = createrTextSwornStatement;
