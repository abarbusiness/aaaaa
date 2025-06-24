import React, { useState } from "react";

const Class10ScienceCbsePYQ = () => {
  const renderLatex = (text) => {
    let processedText = text;

    processedText = processedText.replace(/\$/g, "");

    processedText = processedText.replace(/_\{(.*?)\}/g, "<sub>$1</sub>");
    processedText = processedText.replace(/_([a-zA-Z0-9]+)/g, "<sub>$1</sub>");
    processedText = processedText.replace(/\^\{(.*?)\}/g, "<sup>$1</sup>");
    processedText = processedText.replace(/\^([a-zA-Z0-9]+)/g, "<sup>$1</sup>");
    processedText = processedText.replace(/\\rightarrow/g, "&rarr;");
    processedText = processedText.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    return processedText;
  };

  const [visibleSolutions, setVisibleSolutions] = useState({});

  const toggleSolution = (id) => {
    setVisibleSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const questions = {
    2024: [
      {
        id: "Q1-2024",
        text: "Select from the following a decomposition reaction in which the source of energy for decomposition is light: (2024)\n(a) $2FeSO_{4}\\rightarrow Fe_{2}O_{3}+SO_{2}+SO_{3}$\n(b) $2H_{2}O\\rightarrow2H_{2}+O_{2}$\n(c) $2AgBr\\rightarrow2Ag+Br_{2}$\n(d) $CaCO_{3}\\rightarrow CaO+CO_{2}$",
        solution:
          "Decomposition reactions require energy to break down reactants.\nWhen the source of energy is light, it is called photolytic decomposition.\n(a) Thermal decomposition of ferrous sulfate.\n(b) Electrolytic decomposition of water (requires electricity).\n(c) **Photolytic decomposition of silver bromide.** This reaction is used in black and white photography, where light energy causes silver bromide to decompose into silver and bromine.\n(d) Thermal decomposition of calcium carbonate.\n\nTherefore, the correct answer is **(c)**.",
      },
      {
        id: "Q2-2024",
        text: "When 2 mL of sodium hydroxide solution is added to a few pieces of granulated zinc in a test tube and then warmed, the reaction that occurs can be written in the form of a balanced chemical equation as: (2024)\n(a) $NaOH+Zn\\rightarrow NaZnO_{2}+H_{2}O$\n(b) $2NaOH+Zn\\rightarrow Na_{2}ZnO_{2}+H_{2}$\n(c) $2NaOH+Zn\\rightarrow NaZnO_{2}+H_{2}$\n(d) $2NaOH+Zn\\rightarrow Na_{2}ZnO_{2}+H_{2}O$",
        solution:
          "The reaction between sodium hydroxide (a base) and zinc metal is a displacement reaction that produces sodium zincate and hydrogen gas. The balanced chemical equation is:\n$2NaOH+Zn\\rightarrow Na_{2}ZnO_{2}+H_{2}$\n\nTherefore, the correct answer is **(b)**.",
      },
      {
        id: "Q3-2024",
        text: "Select from the following a process in which a combination reaction is involved: (2024)\n(a) Black and White photography\n(b) Burning of coal\n(c) Burning of methane\n(d) Digestion of food",
        solution:
          "A combination reaction is one in which two or more reactants combine to form a single product.\n(a) Black and white photography involves decomposition of silver halides.\n(b) **Burning of coal ($C+O_{2}\\rightarrow CO_{2}$)** is a combination reaction where carbon combines with oxygen to form carbon dioxide.\n(c) Burning of methane ($CH_{4}+2O_{2}\\rightarrow CO_{2}+2H_{2}O$) is a combustion reaction, but not strictly a combination reaction in terms of forming a single product.\n(d) Digestion of food is a decomposition reaction (breakdown of complex substances).\n\nTherefore, the correct answer is **(b)**.",
      },
      {
        id: "Q4-2024",
        text: "Consider the following cases:\n(A) $CaSO_{4}+Al\\rightarrow$\n(B) $CuSO_{4}+Ca\\rightarrow$\n(C) $FeSO_{4}+Cu\\rightarrow$\n(D) $ZnSO_{4}+Mg\\rightarrow$\nThe cases in which new products will form are: (2024)\n(a) (A) and (B)\n(b) (B) and (C)\n(c) (C)and(D)\n(d) (B) and (D)",
        solution:
          "New products will form if a more reactive metal displaces a less reactive metal from its salt solution. We need to refer to the reactivity series (most reactive to least reactive: K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Ag > Au).\n\n(A) $CaSO_{4}+Al\\rightarrow$ (No reaction, Al is less reactive than Ca)\n(B) $CuSO_{4}+Ca\\rightarrow$ (Reaction, Ca is more reactive than Cu, will displace Cu)\n(C) $FeSO_{4}+Cu\\rightarrow$ (No reaction, Cu is less reactive than Fe)\n(D) $ZnSO_{4}+Mg\\rightarrow$ (Reaction, Mg is more reactive than Zn, will displace Zn)\n\nTherefore, new products will form in cases (B) and (D).\nThe correct answer is **(d)**.",
      },
      {
        id: "Q5-2024",
        text: "Identify the correct statement about the following reaction: (2024)\n$2H_{2}S+SO_{2}\\rightarrow2H_{2}O+S$\n(a) $H_{2}S$ is oxidising agent and $SO_{2}$ is reducing agent.\n(b) $H_{2}S$ is reduced to sulphur.\n(c) $SO_{2}$ is oxidising agent and $H_{2}S$ is reducing agent.\n(d) $SO_{2}$ is oxidised to sulphur.",
        solution:
          "Let's analyze the oxidation and reduction in the given reaction:\n$2H_{2}S+SO_{2}\\rightarrow2H_{2}O+S$\n\n-   In $H_{2}S$, sulfur has an oxidation state of -2. In sulfur (S), its oxidation state is 0. So, $H_{2}S$ loses hydrogen (or its oxidation state increases), meaning $H_{2}S$ is **oxidized to sulphur**.\nTherefore, $H_{2}S$ is acting as a **reducing agent**.\n-   In $SO_{2}$, sulfur has an oxidation state of +4. In sulfur (S), its oxidation state is 0. So, $SO_{2}$ loses oxygen (or its oxidation state decreases), meaning $SO_{2}$ is **reduced to sulphur**.\nTherefore, $SO_{2}$ is acting as an **oxidising agent**.\n\nNow let's check the options:\n(a) $H_{2}S$ is oxidising agent and $SO_{2}$ is reducing agent. (False)\n(b) $H_{2}S$ is reduced to sulphur. (False, $H_{2}S$ is oxidized)\n(c) **$SO_{2}$ is oxidising agent and $H_{2}S$ is reducing agent.** (True)\n(d) $SO_{2}$ is oxidised to sulphur. (False, $SO_{2}$ is reduced)\n\nTherefore, the correct statement is **(c)**.",
      },
      {
        id: "Q6-2024",
        text: "Consider the following Chemical equation:\n$aFe_{2}O_{3}(s)+bCO(g)\\rightarrow cFe(s)+dCO_{2}(g)$\nIn order to balance this chemical equation, the values of a, b, c and d must be\n(A) 1, 6, 2 and 3\n(B) 1, 6, 3 and 2\n(C) 2, 6, 2 and 3\n(D) 2, 6, 3 and 2",
        solution: `To balance the chemical equation $aFe_{2}O_{3}(s)+bCO(g)\\rightarrow cFe(s)+dCO_{2}(g)$, we need to ensure the number of atoms of each element is equal on both sides.

Let's use the algebraic method:
For Fe: $2a = c$
For C: $b = d$
For O: $3a + b = 2d$

Substitute $b=d$ into the oxygen equation:
$3a + b = 2b$
$3a = b$

Now we have the relationships: $b = 3a$ and $c = 2a$.

Let's choose a simple value for 'a', say $a=1$. Then:
$b = 3 \\times 1 = 3$
$c = 2 \\times 1 = 2$
$d = b = 3$

So, the coefficients are $a=1, b=3, c=2, d=3$. The balanced equation is:
$Fe_{2}O_{3}(s)+3CO(g)\\rightarrow 2Fe(s)+3CO_{2}(g)$

Upon checking the provided options:
(A) 1, 6, 2 and 3
(B) 1, 6, 3 and 2
(C) 2, 6, 2 and 3
(D) 2, 6, 3 and 2

None of the options exactly match the correct coefficients (1, 3, 2, 3). This indicates a potential discrepancy or error in the options provided in the original question from the source PDF. If this were an exam, such a question would typically be dismissed or require clarification. However, based on the fundamental rules of chemical balancing, the derived coefficients (1, 3, 2, 3) are correct for this reaction. It's important to note this discrepancy.`,
      },
      {
        id: "Q7-2024",
        text: "Which of the following reactions is different from the remaining three? (2024)\n(a) $laCl+AgNO_{3}\\rightarrow AgCl+NaNO_{3}$\n$(b)CaO+H_{2}O\\rightarrow Ca(OH)_{2}$\n( $c)KNO_{3}+H_{2}SO_{4}\\rightarrow KHSO_{4}+HNO_{3}$\n(d) $ZnCl_{2}+H_{2}S\\rightarrow ZnS+2HCl$",
        solution:
          "Let's identify the type of each reaction:\n(a) $NaCl+AgNO_{3}\\rightarrow AgCl+NaNO_{3}$: This is a **double displacement reaction** (specifically, precipitation, as AgCl is a precipitate).\n(b) $CaO+H_{2}O\\rightarrow Ca(OH)_{2}$: This is a **combination reaction** (two reactants combine to form a single product) and also an exothermic reaction.\n(c) $KNO_{3}+H_{2}SO_{4}\\rightarrow KHSO_{4}+HNO_{3}$: This is a **double displacement reaction** (acid-base or salt displacement).\n(d) $ZnCl_{2}+H_{2}S\\rightarrow ZnS+2HCl$: This is a **double displacement reaction** (specifically, precipitation, as ZnS is a precipitate).\n\nTherefore, the reaction that is different from the remaining three is **(b) $CaO+H_{2}O\\rightarrow Ca(OH)_{2}$**, which is a combination reaction, whereas the others are double displacement reactions.\nThe correct answer is **(b)**.",
      },
      {
        id: "Q8-2024",
        text: "The above reaction is a: (2024)\n$Zn+2CH_{3}COOH\\rightarrow Zn(CH_{3}COO)_{2}+H_{2}$\n(a) Decomposition reaction\n(b) Displacement reaction\n(c) Double displacement reaction\n(d) Combination reaction",
        solution:
          "In the reaction $Zn+2CH_{3}COOH\\rightarrow Zn(CH_{3}COO)_{2}+H_{2}$, zinc (Zn) is displacing hydrogen (H) from acetic acid ($CH_{3}COOH$). A more reactive metal displacing a less reactive element from its compound is a **displacement reaction**.\n\nTherefore, the correct answer is **(b)**.",
      },
      {
        id: "Q9-2024",
        text: "To balance the following chemical equation, the values of the coefficients x, y and z must be respectively: (2024)\n$xPb(NO_{3})_{2}(s)\\xrightarrow{Heat} yPbO(s)+zNO_{2}(g)+O_{2}(g)$\n(a)4, 2, 2\n(b)4, 4, 2\n(c)2, 2, 4\n(d)2, 4, 2",
        solution:
          "To balance the decomposition reaction: $xPb(NO_{3})_{2}(s)\\xrightarrow{Heat} yPbO(s)+zNO_{2}(g)+O_{2}(g)$\n\nLet's try to balance it step-by-step:\n1.  Start with Pb: If $x=1$, then $y=1$.\n    $Pb(NO_{3})_{2}\\rightarrow PbO+zNO_{2}+O_{2}$\n2.  Balance N: There are 2 N on the left. So, $z=2$.\n    $Pb(NO_{3})_{2}\\rightarrow PbO+2NO_{2}+O_{2}$\n3.  Balance O: On the left, $3 \\times 2 = 6$ oxygen atoms. On the right, $1 (from PbO) + 2 \\times 2 (from NO_{2}) + 2 (from O_{2}) = 1 + 4 + 2 = 7$ oxygen atoms. It's not balanced with $x=1$.\n\nLet's try doubling $x$ to $x=2$ (since we have an odd number of oxygens from nitrates and a whole $O_{2}$): If $x=2$, then $y=2$.\n$2Pb(NO_{3})_{2}\\rightarrow 2PbO+zNO_{2}+O_{2}$\n\nNow balance N: There are $2 \\times 2 = 4$ N on the left. So, $z=4$.\n$2Pb(NO_{3})_{2}\\rightarrow 2PbO+4NO_{2}+O_{2}$\n\nFinally, balance O:\nLeft side: $2 \\times 3 \\times 2 = 12$ oxygen atoms.\nRight side: $2 (from PbO) + 4 \\times 2 (from NO_{2}) + 2 (from O_{2}) = 2 + 8 + 2 = 12$ oxygen atoms.\n\nThe equation is balanced with $x=2, y=2, z=4$. These coefficients are for $Pb(NO_{3})_{2}$, $PbO$, and $NO_{2}$ respectively.\n\nComparing with the options:\n(a) 4, 2, 2\n(b) 4, 4, 2\n(c) **2, 2, 4**\n(d) 2, 4, 2\n\nThe correct answer is **(c)**.",
      },
      {
        id: "Q10-2024",
        text: "Which of the following is a redox reaction, but not a combination reaction? (2024)\n(a) $C+O_{2}\\rightarrow CO_{2}$\n(b) $2H_{2}+O_{2}\\rightarrow2~H_{2}O$\n(c) $2Mg+O_{2}\\rightarrow2MgO$\n(d) $Fe_{2}O_{3}+3~CO\\rightarrow2~Fe+3~CO_{2}$",
        solution:
          "A redox reaction involves both oxidation and reduction. A combination reaction is one where two or more reactants combine to form a single product.\n\nLet's analyze each option:\n(a) $C+O_{2}\\rightarrow CO_{2}$: This is a combination reaction (forms single product) and a redox reaction (C is oxidized, O is reduced).\n(b) $2H_{2}+O_{2}\\rightarrow2~H_{2}O$: This is a combination reaction (forms single product) and a redox reaction ($H_{2}$ is oxidized, $O_{2}$ is reduced).\n(c) $2Mg+O_{2}\\rightarrow2MgO$: This is a combination reaction (forms single product) and a redox reaction (Mg is oxidized, O is reduced).\n(d) **$Fe_{2}O_{3}+3~CO\\rightarrow2~Fe+3~CO_{2}$**: This is a displacement/redox reaction (Fe is reduced, CO is oxidized). It is **not a combination reaction** because multiple products are formed.\n\nTherefore, the correct answer is **(d)**.",
      },
      {
        id: "Q11-2024",
        text: "Name the type of chemical reaction in which calcium oxide reacts with water. Justify your answer by giving a balanced chemical equation for the chemical reaction. (2024)",
        solution:
          "When calcium oxide (quicklime) reacts with water, it forms calcium hydroxide (slaked lime) and releases a large amount of heat.\n\nType of chemical reaction: **Combination reaction**.\n\n**Justification:** In this reaction, two reactants (calcium oxide and water) combine to form a single product (calcium hydroxide).\n\nBalanced chemical equation:\n$CaO(s)+H_{2}O(l)\\rightarrow Ca(OH)_{2}(aq)$",
      },
      {
        id: "Q12-2024",
        text: "Write one chemical equation each for the chemical reaction in which the following have taken place:\n(i) Change in colour\n(ii) Change in temperature\n(iii) Formation of precipitate\nMention colour change/temperature change (rise/fall)/compound precipitated along with the equation. (2024)",
        solution:
          "Here are chemical equations for the requested changes:\n\n(i) **Change in colour:**\n    Reaction: When an iron nail is placed in copper sulfate solution.\n    Equation: $Fe(s)+CuSO_{4}(aq)\\rightarrow FeSO_{4}(aq)+Cu(s)$\n    Colour Change: The **blue colour** of copper sulfate solution fades and turns to **light green** (due to the formation of ferrous sulfate), and a reddish-brown deposit (copper) forms on the iron nail.\n\n(ii) **Change in temperature (Rise in temperature - Exothermic):**\n    Reaction: When quicklime (calcium oxide) reacts with water.\n    Equation: $CaO(s)+H_{2}O(l)\\rightarrow Ca(OH)_{2}(aq) + Heat$\n    Temperature Change: This is an **exothermic reaction**, so the temperature of the reaction mixture **rises significantly**, and the test tube feels warm or hot.\n\n(iii) **Formation of precipitate:**\n    Reaction: When lead nitrate solution reacts with potassium iodide solution.\n    Equation: $Pb(NO_{3})_{2}(aq)+2KI(aq)\\rightarrow PbI_{2}(s)+2KNO_{3}(aq)$\n    Compound Precipitated: A **yellow precipitate** of **Lead(II) iodide ($PbI_{2}$)** is formed.",
      },
      {
        id: "Q13-2024",
        text: "When magnesium ribbon is burnt in the air, an ash of white colour is produced. Write the chemical equation for the reaction giving the chemical name of the ash produced. State the type of chemical reaction justifying your answer. (2024)",
        solution:
          "When magnesium ribbon is burnt in the air (which contains oxygen), it reacts vigorously to form magnesium oxide, a white ash.\n\nChemical equation:\n$2Mg(s)+O_{2}(g)\\rightarrow 2MgO(s)$\n\nChemical name of the ash produced: **Magnesium oxide**.\n\nType of chemical reaction: **Combination reaction**.\n\n**Justification:** In this reaction, two reactants (magnesium and oxygen) combine to form a single product (magnesium oxide).",
      },
      {
        id: "Q14-2024",
        text: "Study the experimental set-up shown in the diagram and write a chemical equation for the chemical reaction involved. Name and define the type of reaction. List two other metals that can be used in place of iron to show the same type of reaction with copper sulphate solution. (2024)\nImage of experimental set-up: Iron nail suspended in copper sulphate solution.",
        diagramText:
          "Experimental setup showing iron nail in copper sulfate solution.",
        solution:
          "The diagram shows an iron nail placed in copper sulfate solution. This setup demonstrates a displacement reaction.\n\nChemical equation for the reaction involved:\n$Fe(s)+CuSO_{4}(aq)\\rightarrow FeSO_{4}(aq)+Cu(s)$\n\nName of the type of reaction: **Displacement reaction**.\n\nDefinition: A **displacement reaction** is a type of chemical reaction where a more reactive element displaces a less reactive element from its compound (solution or molten state).\n\nTwo other metals that can be used in place of iron to show the same type of reaction with copper sulfate solution:\nAny metal more reactive than copper but also reasonably safe to use in a school lab. Examples include:\n1.  **Zinc (Zn)**: Zinc is more reactive than copper.\n    $Zn(s)+CuSO_{4}(aq)\\rightarrow ZnSO_{4}(aq)+Cu(s)$\n2.  **Magnesium (Mg)**: Magnesium is more reactive than copper.\n    $Mg(s)+CuSO_{4}(aq)\\rightarrow MgSO_{4}(aq)+Cu(s)$",
      },
      {
        id: "Q15-2024",
        text: "For Q. Nos., two statements are given - One labelled as Assertion (A) and the other labelled as Reason (R). Select the correct answer to these questions from the codes (a), (b), (c) and (d) as given below: (2024)\nAssertion (A): Hydrogen gas is not evolved when zinc reacts with nitric acid.\nReason (R): Nitric acid oxidises the hydrogen gas produced to water and itself gets reduced.\n(a) Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of the Assertion (A).\n(b) Both Assertion (A) and Reason (R) are true, but Reason (R) is not the correct explanation of the Assertion (A).\n(c) Assertion (A) is true, but Reason (R) is false.\n(d) Assertion (A) is false, but Reason (R) is true.",
        solution:
          "Let's analyze the Assertion (A) and Reason (R):\n\nAssertion (A): Hydrogen gas is not evolved when zinc reacts with nitric acid. (True - Although zinc is more reactive than hydrogen, nitric acid is a strong oxidizing agent).\nReason (R): Nitric acid oxidises the hydrogen gas produced to water and itself gets reduced. (True - Dilute nitric acid acts as an oxidizing agent and oxidizes the nascent hydrogen formed to water. It is itself reduced to oxides of nitrogen like $NO_{2}$, NO, $N_{2}O$, etc., depending on the concentration of the acid).\n\nSince Reason (R) accurately explains why hydrogen gas is not evolved (due to nitric acid's oxidizing nature), Reason (R) is the correct explanation of Assertion (A).\n\nTherefore, the correct answer is **(a)**.",
      },
      {
        id: "Q16-2024",
        text: "What is a chemical reaction? Describe one activity each to show that a chemical change has occurred in which (i) a change of colour, and (ii) a change in temperature has taken place. (2024)",
        solution:
          "**Chemical reaction:** A chemical reaction is a process that involves the rearrangement of the molecular or ionic structure of a substance, as opposed to a change in physical form or a nuclear reaction. In a chemical reaction, reactants are transformed into new substances called products, often with observable changes in properties.\n\n**Activities to show chemical change:**\n\n(i) **Activity showing change of colour:**\n    * **Materials:** Iron filings, copper sulfate solution.\n    * **Procedure:** Take about 10 mL of copper sulfate solution (blue color) in a test tube. Add a small amount of iron filings or an iron nail to the solution. Leave it undisturbed for some time (e.g., 20-30 minutes).\n    * **Observation:** The blue color of the copper sulfate solution starts to fade and eventually turns into a light green color. A reddish-brown deposit (copper) forms on the surface of the iron filings/nail.\n    * **Chemical Equation:** $Fe(s)+CuSO_{4}(aq)\\rightarrow FeSO_{4}(aq)+Cu(s)$\n    * **Conclusion:** The change in color from blue to light green and the formation of a new reddish-brown substance indicate that a chemical reaction (displacement reaction) has occurred.\n\n(ii) **Activity showing change in temperature (rise):**\n    * **Materials:** Quicklime (calcium oxide) pieces, water.\n    * **Procedure:** Take a small amount of quicklime in a beaker. Slowly add water to it. Touch the bottom of the beaker.\n    * **Observation:** You will observe vigorous bubbling and sizzling sounds. The quicklime will form a white suspension (slaked lime). Upon touching the beaker, you will feel that it has become significantly warm or hot.\n    * **Chemical Equation:** $CaO(s)+H_{2}O(l)\\rightarrow Ca(OH)_{2}(aq) + Heat$\n    * **Conclusion:** The noticeable increase in temperature indicates that energy is released during the reaction, signifying an exothermic chemical change (combination reaction).",
      },
      {
        id: "Q17-2024",
        text: "(i) Define a decomposition reaction. How can we say that (I) electrolysis of water, and (II) blackening of silver bromide when exposed to sunlight, are decomposition reactions? Mention the type of energy involved in each case.\n(ii) The type of reactions in which (I) calcium oxide is formed, and (II) calcium hydroxide is formed are opposite reactions to each other. Justify this statement with the help of chemical equations. (2024)",
        solution:
          "(i) **Decomposition reaction:** A decomposition reaction is a type of chemical reaction in which a single compound breaks down into two or more simpler substances (elements or simpler compounds).\n\n    * **(I) Electrolysis of water:** Water decomposes into hydrogen gas and oxygen gas when electric current is passed through it. This is a decomposition reaction because a single compound ($H_{2}O$) breaks down into two simpler substances ($H_{2}$ and $O_{2}$). The type of energy involved is **electrical energy**.\n        Equation: $2H_{2}O(l)\\xrightarrow{Electricity} 2H_{2}(g)+O_{2}(g)$\n\n    * **(II) Blackening of silver bromide when exposed to sunlight:** Silver bromide decomposes into silver metal and bromine gas when exposed to sunlight, causing the white silver bromide to turn greyish-black (due to the formation of silver). This is a decomposition reaction because a single compound ($AgBr$) breaks down into two simpler substances ($Ag$ and $Br_{2}$). The type of energy involved is **light energy** (photolytic decomposition).\n        Equation: $2AgBr(s)\\xrightarrow{Sunlight} 2Ag(s)+Br_{2}(g)$\n\n(ii) **Justification for opposite reactions:**\n    * **(I) Calcium oxide is formed:** Calcium oxide (CaO) is typically formed by the decomposition of calcium carbonate ($CaCO_{3}$) when heated. This is a **decomposition reaction**.\n        Equation: $CaCO_{3}(s)\\xrightarrow{Heat} CaO(s)+CO_{2}(g)$\n\n    * **(II) Calcium hydroxide is formed:** Calcium hydroxide ($Ca(OH)_{2}$) is formed when calcium oxide (CaO) reacts with water ($H_{2}O$). This is a **combination reaction**.\n        Equation: $CaO(s)+H_{2}O(l)\\rightarrow Ca(OH)_{2}(aq)$\n\n    These two reactions are opposite to each other in terms of their types: one is a decomposition reaction (breaking down a single compound) and the other is a combination reaction (forming a single compound from two or more reactants).",
      },
      {
        id: "Q18-2024",
        text: "(a) Copper powder is taken in a china dish and heated over a burner. Name the product formed and state its colour. Write the chemical equation for the reaction involved. (2024)\nOR\n(b) Write a chemical equation for the chemical reaction that occurs when the aqueous solutions of barium chloride and sodium sulphate react together. Write the symbols of the ions present in the compound precipitated in the reaction.",
        solution:
          "(a) When copper powder is heated over a burner, it reacts with oxygen in the air.\n    * Product formed: **Copper(II) oxide** (CuO).\n    * Colour: **Black**.\n    * Chemical equation: $2Cu(s)+O_{2}(g)\\xrightarrow{Heat} 2CuO(s)$\n\nOR\n\n(b) When aqueous solutions of barium chloride and sodium sulfate react together, they form barium sulfate (a precipitate) and sodium chloride.\n    * Chemical equation: $BaCl_{2}(aq)+Na_{2}SO_{4}(aq)\\rightarrow BaSO_{4}(s)+2NaCl(aq)$\n    * Compound precipitated: **Barium sulfate ($BaSO_{4}$)**.\n    * Symbols of ions present in the compound precipitated: **$Ba^{2+}$ (Barium ion)** and **$SO_{4}^{2-}$ (Sulfate ion)**.",
      },
      {
        id: "Q19-2024",
        text: "(A) Write the essential conditions for the following reaction to take place and name its types:\n$2AgCl\\rightarrow2Ag+Cl_{2}$\n(B) Complete the following chemical reaction in the form of a balanced equation: (CBSE 2024)\n$Na_{2}SO_{4}(aq)+BaCl_{2}(aq)\\rightarrow$ ",
        solution:
          "(A) Reaction: $2AgCl(s)\\rightarrow2Ag(s)+Cl_{2}(g)$\n    * Essential condition: **Presence of light (sunlight)**.\n    * Type of reaction: **Photolytic decomposition reaction**.\n\n(B) Complete and balance the chemical reaction:\n    $Na_{2}SO_{4}(aq)+BaCl_{2}(aq)\\rightarrow BaSO_{4}(s)+2NaCl(aq)$\n    This is a **double displacement reaction**, specifically a **precipitation reaction**, as barium sulfate ($BaSO_{4}$) is an insoluble white precipitate.",
      },
    ],
    2023: [
      {
        id: "Q1-2023",
        text: "When aqueous solutions of potassium iodide and lead nitrate are mixed, an insoluble substance separates out. The chemical equation for the reaction involved is (2023)\n(a) $Kl+PbNO_{3}\\rightarrow PbI+KNO_{3}$\n(b) $2Kl+Pb(NO_{3})_{2}\\rightarrow Pbl_{2}+2KNO_{3}$\n(c) $Kl+Pb(NO_{3})_{2}\\rightarrow Pbl+KNO_{3}(d)Kl+PbNO_{3}\\rightarrow Pbl_{2}+KNO_{3}$",
        solution:
          "This is a double displacement reaction where ions are exchanged, leading to the formation of a precipitate. Lead(II) iodide ($PbI_{2}$) is an insoluble yellow precipitate.\n\nLet's check the balancing and correct formulas:\nReactants: Potassium iodide (KI), Lead nitrate ($Pb(NO_{3})_{2}$)\nProducts: Lead iodide ($PbI_{2}$), Potassium nitrate ($KNO_{3}$)\n\nBalanced equation:\n$2KI(aq)+Pb(NO_{3})_{2}(aq)\\rightarrow PbI_{2}(s)+2KNO_{3}(aq)$\n\nComparing with the options:\n(a) Incorrect formulas and balancing.\n(b) **Correct formulas and balancing.**\n(c) Incorrect formulas and balancing.\n(d) Incorrect formulas and balancing.\n\nTherefore, the correct answer is **(b)**.",
      },
      {
        id: "Q2-2023",
        text: "The balanced chemical equation showing the reaction between quick lime and water is (2023)\n(a) $2CaO+H_{2}O\\rightarrow2CaOH+H_{2}+Heat$\n(b) $CaO+H_{2}O\\rightarrow Ca(OH)_{2}+H_{2}+Heat$\n(c) $CaO+H_{2}O\\rightarrow Ca(OH)_{2}+Heat$\n(d) $2CaO+3H_{2}O\\rightarrow2Ca(OH)_{3}+O_{2}+Heat$",
        solution:
          "Quicklime is calcium oxide (CaO). When it reacts with water ($H_{2}O$), it forms slaked lime (calcium hydroxide, $Ca(OH)_{2}$) and releases heat (exothermic reaction).\n\nThe balanced chemical equation is:\n$CaO(s)+H_{2}O(l)\\rightarrow Ca(OH)_{2}(aq)+Heat$\n\nComparing with the options:\n(a) Incorrect product formula.\n(b) Incorrect products, specifically hydrogen gas is not formed.\n(c) **Correct products and indication of heat, and is balanced.**\n(d) Incorrect products and balancing.\n\nTherefore, the correct answer is **(c)**.",
      },
      {
        id: "Q3-2023",
        text: "Assertion (A): In the following reaction $ZnO+C\\rightarrow Zn+CO$\nZnO undergoes reduction.\nReason (R): Carbon is a reducing agent that reduces ZnO to Zn. (2023)\n(a) Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A)\n(b) Both Assertion (A) and Reason (R) are true, but Reason (R) is not the correct explanation of the Assertion (A)\n(c) Assertion (A) is true, but Reason (R) is False.\n(d) Assertion (A) is false, but Reason (R) is true.",
        solution:
          "Let's analyze the reaction $ZnO+C\\rightarrow Zn+CO$:\n\n-   **Assertion (A): ZnO undergoes reduction.** (True) - Zinc oxide (ZnO) loses oxygen to form zinc (Zn), which is reduction.\n-   **Reason (R): Carbon is a reducing agent that reduces ZnO to Zn.** (True) - Carbon gains oxygen to form carbon monoxide (CO), so it acts as a reducing agent by causing ZnO to lose oxygen (be reduced).\n\nSince Reason (R) accurately explains why ZnO undergoes reduction (because Carbon acts as a reducing agent), Reason (R) is the correct explanation of Assertion (A).\n\nTherefore, the correct answer is **(a)**.",
      },
      {
        id: "Q4-2023",
        text: "Assertion (A): The reaction of quick lime with water is an exothermic reaction.\nReason (R): Quicklime reacts vigorously with water releasing a large amount of heat. (2023)\n(a) Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A)\n(b) Both Assertion (A) and Reason (R) are true, but Reason (R) is not the correct explanation of the Assertion (A)\n(c) Assertion (A) is true, but Reason (R) is False\n(d) Assertion (A) is false, but Reason (R) is true",
        solution:
          "Let's analyze the Assertion (A) and Reason (R):\n\n-   **Assertion (A): The reaction of quick lime with water is an exothermic reaction.** (True) - Exothermic reactions release heat.\n-   **Reason (R): Quicklime reacts vigorously with water releasing a large amount of heat.** (True) - This statement describes the nature of the reaction, which indeed involves a vigorous release of heat.\n\nSince Reason (R) directly explains *why* the reaction is exothermic (because it releases a large amount of heat), Reason (R) is the correct explanation of Assertion (A).\n\nTherefore, the correct answer is **(a)**.",
      },
      {
        id: "Q5-2023",
        text: "(i) While electrolyzing water before passing the current some drops of an acid are added why? Name the gases liberated at the cathode and anode. Write the relationship between the volume of gas collected at the anode and the volume of gas collected at the cathode.\n(ii) What is observed when silver chloride is exposed to sunlight? Give the type of reaction involved. (2023 C)",
        solution:
          "(i) **Why acid is added during electrolysis of water:** Pure water is a poor conductor of electricity. Adding a few drops of an acid (like dilute sulfuric acid) makes water a better conductor by providing ions ($H^{+}$ and $SO_{4}^{2-}$), thus facilitating the flow of electric current and enabling the decomposition of water.\n\n    * Gases liberated:\n        * At **Cathode (-ve electrode): Hydrogen gas ($H_{2}$)**\n        * At **Anode (+ve electrode): Oxygen gas ($O_{2}$)**\n\n    * Relationship between volumes: The volume of hydrogen gas collected at the cathode is **twice** the volume of oxygen gas collected at the anode.\n        This is because water ($H_{2}O$) has a 2:1 ratio of hydrogen atoms to oxygen atoms.\n        Chemical equation: $2H_{2}O(l)\\xrightarrow{Electricity} 2H_{2}(g)+O_{2}(g)$\n\n(ii) **Observation when silver chloride is exposed to sunlight:** When white silver chloride (AgCl) is exposed to sunlight, it gradually turns **greyish-black**.\n    * Type of reaction involved: **Photolytic decomposition reaction** (or Photodecomposition).\n    * Chemical equation: $2AgCl(s)\\xrightarrow{Sunlight} 2Ag(s)+Cl_{2}(g)$",
      },
      {
        id: "Q6-2023",
        text: "(a) Define a double displacement reaction.\n(b) Write the chemical equation of a double displacement reaction which is also a (i) Neutralisation reaction and (ii) Precipitation reaction. Give justification for your answer. (2023)",
        solution:
          "(a) **Double displacement reaction:** A double displacement reaction is a type of chemical reaction where there is an exchange of ions between two reactants in solution to form new compounds. This typically occurs when one of the products is a precipitate (insoluble solid), a gas, or water.\n\n(b) **Double displacement reactions that are also:**\n    (i) **Neutralisation reaction:**\n        * Equation: $NaOH(aq)+HCl(aq)\\rightarrow NaCl(aq)+H_{2}O(l)$\n        * Justification: This is a double displacement reaction because the ions ($Na^{+}$ with $Cl^{-}$ and $H^{+}$ with $OH^{-}$) are exchanged. It is also a neutralization reaction because an acid (HCl) reacts with a base (NaOH) to form salt (NaCl) and water ($H_{2}O$).\n\n    (ii) **Precipitation reaction:**\n        * Equation: $BaCl_{2}(aq)+Na_{2}SO_{4}(aq)\\rightarrow BaSO_{4}(s)+2NaCl(aq)$\n        * Justification: This is a double displacement reaction because the ions ($Ba^{2+}$ with $SO_{4}^{2-}$ and $Na^{+}$ with $Cl^{-}$) are exchanged. It is also a precipitation reaction because one of the products formed, barium sulfate ($BaSO_{4}$), is an insoluble white solid that settles out as a precipitate.",
      },
      {
        id: "Q7-2023",
        text: "The emission of brown fumes in the given experimental set-up is due to: (CBSE 2023)\nImage of experimental setup: Test tube with Lead nitrate being heated over a burner, showing brown fumes being emitted.\n(a) thermal decomposition of lead nitrate which produces brown fumes of nitrogen dioxide.\n(b) thermal decomposition of lead nitrate which produces brown fumes of lead oxide.\n(c) oxidation of lead nitrate forming lead oxide and nitrogen dioxide.\n(d) oxidation of lead nitrate forming lead oxide and oxygen.",
        diagramText: "Lead nitrate heating setup emitting brown fumes.",
        solution:
          "The experimental setup shows the thermal decomposition of lead nitrate.\nWhen lead nitrate is heated, it decomposes to produce lead oxide (PbO), nitrogen dioxide ($NO_{2}$), and oxygen gas ($O_{2}$). Nitrogen dioxide is a brown-colored gas, responsible for the brown fumes observed.\n\nEquation: $2Pb(NO_{3})_{2}(s)\\xrightarrow{Heat} 2PbO(s)+4NO_{2}(g)+O_{2}(g)$\n\n(a) **thermal decomposition of lead nitrate which produces brown fumes of nitrogen dioxide.** (True)\n(b) thermal decomposition of lead nitrate which produces brown fumes of lead oxide. (False, lead oxide is a solid, not brown fumes)\n(c) oxidation of lead nitrate forming lead oxide and nitrogen dioxide. (False, it's decomposition, not oxidation of lead nitrate).\n(d) oxidation of lead nitrate forming lead oxide and oxygen. (False, it's decomposition, and $NO_{2}$ is also formed).\n\nTherefore, the correct answer is **(a)**.",
      },
      {
        id: "Q8-2023",
        text: "In the experimental setup given below, it is observed that on passing the gas produced in the reaction in the solution 'X' the solution 'X' first turns milky and then colourless.\nImage of experimental setup: Test tube with dilute HCl and Sodium carbonate, gas being collected and passed into solution X.\nThe option that justifies the given observation is that 'X' is aqueous calcium hydroxide and:\n(a) it turns milky due to carbon dioxide gas liberated in the reaction and after some time it becomes colorless due to the formation of calcium carbonate.\n(b) it turns milky due to the formation of calcium carbonate and on passing excess of carbon dioxide it becomes colorless due to the formation of calcium hydrogen carbonate which is soluble in water.\n(c) it turns milky due to the passing of carbon dioxide through it. It turns colorless as on further passing carbon dioxide, sodium hydrogen carbonate is formed which is soluble in water.\n(d) the carbon dioxide liberated during the reaction turns lime water milky due to the formation of calcium hydrogen carbonate and after some time, it turns colorless due to the formation of calcium carbonate which is soluble in water. (CBSE 2023)",
        diagramText:
          "Setup showing gas from HCl + Sodium carbonate reacting with solution X.",
        solution:
          "The initial reaction (Dilute Hydrochloric Acid + Sodium carbonate) produces carbon dioxide gas ($CO_{2}$).\nEquation: $Na_{2}CO_{3}(s)+2HCl(aq)\\rightarrow 2NaCl(aq)+H_{2}O(l)+CO_{2}(g)$\n\nThe gas ($CO_{2}$) is then passed into solution 'X', which is stated to be aqueous calcium hydroxide (lime water, $Ca(OH)_{2}(aq)$).\n\n**First observation: Solution turns milky.**\nWhen $CO_{2}$ is passed through lime water, it reacts to form insoluble calcium carbonate ($CaCO_{3}$), which appears as a white precipitate, making the solution milky.\nEquation: $Ca(OH)_{2}(aq)+CO_{2}(g)\\rightarrow CaCO_{3}(s) + H_{2}O(l)$\n\n**Second observation: Solution becomes colorless (clear) upon further passing of gas.**\nWhen excess $CO_{2}$ is passed through the milky solution, the insoluble calcium carbonate reacts with $CO_{2}$ and water to form soluble calcium hydrogen carbonate ($Ca(HCO_{3})_{2}$), which is soluble in water. This causes the milky solution to become clear again.\nEquation: $CaCO_{3}(s)+H_{2}O(l)+CO_{2}(g)\\rightarrow Ca(HCO_{3})_{2}(aq)$\n\nNow, let's check the options:\n(a) Incorrect reason for becoming colorless.\n(b) **Correct. It turns milky due to formation of calcium carbonate and then becomes colorless due to soluble calcium hydrogen carbonate.**\n(c) Incorrect product for colorless stage (sodium hydrogen carbonate).\n(d) Incorrect reason for turning milky and incorrect for turning colorless (calcium carbonate is insoluble, not soluble).\n\nTherefore, the correct answer is **(b)**.",
      },
      {
        id: "Q9-2023",
        text: "Assertion (A): The colour of aqueous solution of copper sulphate turns colourless when a piece of lead is added to it.\nReason (R): Lead is more reactive than copper, and hence displaces copper from its salt solution. (CBSE 2023)\n(a) Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A)\n(b) Both Assertion (A) and Reason (R) are true, but Reason (R) is not the correct explanation of the Assertion (A)\n(c) Assertion (A) is true, but Reason (R) is False\n(d) Assertion (A) is false, but Reason (R) is true",
        solution: `Let's analyze the Assertion (A) and Reason (R):

-   **Assertion (A): The colour of aqueous solution of copper sulphate turns colourless when a piece of lead is added to it.** (True) - When lead displaces copper, the blue color of copper sulfate disappears. While a white precipitate of lead sulfate forms, the solution itself loses its color, making the statement generally considered true in the context of losing the *original* color.
    Equation: $Pb(s)+CuSO_{4}(aq)\\rightarrow PbSO_{4}(s)+Cu(s)$

-   **Reason (R): Lead is more reactive than copper, and hence displaces copper from its salt solution.** (True) - According to the reactivity series, Lead (Pb) is indeed more reactive than Copper (Cu).

Since Reason (R) accurately explains why the displacement occurs, leading to the color change described in Assertion (A), Reason (R) is the correct explanation of Assertion (A).

Therefore, the correct answer is **(a)**.`,
      },
      {
        id: "Q10-2023",
        text: "(A) Identify the reducing agent in the following reactions:\n(i) $4NH_{3}+5O_{2}\\rightarrow4NO+6H_{2}O$\n(ii) $H_{2}O+F_{2}\\rightarrow HF+HOF$\n(iii) $Fe_{2}O_{3}+3CO\\rightarrow2Fe+3CO_{2}$\n(iv) $2H_{2}+O_{2}\\rightarrow2H_{2}O$\n(B) Define a redox reaction in terms of gain or loss of oxygen.",
        solution:
          "(A) **Identifying the reducing agent:** A reducing agent is a substance that causes another substance to be reduced (by losing oxygen, gaining hydrogen, or gaining electrons) and is itself oxidized (by gaining oxygen, losing hydrogen, or losing electrons).\n\n(i) $4NH_{3}+5O_{2}\\rightarrow4NO+6H_{2}O$\n    * $NH_{3}$ is oxidized to NO (Nitrogen loses hydrogen and gains oxygen).\n    * $O_{2}$ is reduced to $H_{2}O$ (Oxygen gains hydrogen).\n    * **Reducing agent: $NH_{3}$**\n\n(ii) $H_{2}O+F_{2}\\rightarrow HF+HOF$\n    * $H_{2}O$ is oxidized to HOF (Oxygen's oxidation state changes from -2 to 0 in HOF, and hydrogen is lost relative to F gaining it). More simply, $H_{2}O$ loses hydrogen to $F_{2}$ and gains oxygen in HOF (conceptual gain relative to F). Oxygen in HOF is +1 or 0.\n    * $F_{2}$ is reduced to HF.\n    * **Reducing agent: $H_{2}O$**\n\n(iii) $Fe_{2}O_{3}+3CO\\rightarrow2Fe+3CO_{2}$\n    * $Fe_{2}O_{3}$ is reduced to Fe (loses oxygen).\n    * $CO$ is oxidized to $CO_{2}$ (gains oxygen).\n    * **Reducing agent: $CO$**\n\n(iv) $2H_{2}+O_{2}\\rightarrow2H_{2}O$\n    * $H_{2}$ is oxidized to $H_{2}O$ (gains oxygen).\n    * $O_{2}$ is reduced to $H_{2}O$ (gains hydrogen).\n    * **Reducing agent: $H_{2}$**\n\n(B) **Redox reaction in terms of gain or loss of oxygen:**\n    A **redox reaction** is a chemical reaction in which both oxidation and reduction occur simultaneously.\n    * **Oxidation:** Is the process of **gain of oxygen** by a substance.\n    * **Reduction:** Is the process of **loss of oxygen** by a substance.",
      },
    ],
    2022: [
      {
        id: "Q1-2022",
        text: "Sodium reacts with water to form sodium hydroxide and hydrogen gas. The balanced equation which represents the above reaction is (2022)\n(a) $Na_{(s)}+2H_{2}O(l)\\rightarrow2NaOH_{(aq)}+2H_{2(g)}$\n(b) $2Na_{(s)}+2H_{2}O_{(l)}\\rightarrow2NaOH_{(aq)}+H_{2(g)}$\n(c) $2Na_{(s)}+2H_{2}O_{(l)}\\rightarrow NaOH_{(aq)}+2H_{2(g)}$\n(d) $2Na_{(s)}+H_{2}O(_{l)}\\rightarrow2NaOH_{(aq)}+2H_{2(g)}$",
        solution:
          "The reaction between sodium (Na) and water ($H_{2}O$) produces sodium hydroxide (NaOH) and hydrogen gas ($H_{2}$). This is a single displacement reaction.\n\nLet's balance the equation:\n$Na(s)+H_{2}O(l)\\rightarrow NaOH(aq)+H_{2}(g)$\n\nTo balance, we need to ensure the number of atoms of each element is equal on both sides:\nStart with H atoms. There are 2 on LHS, but 1+2 = 3 on RHS. If we put 2 in front of $H_{2}O$ and $NaOH$:\n$Na+2H_{2}O\\rightarrow 2NaOH+H_{2}$\nNow, Na is 1 on LHS and 2 on RHS. Put 2 in front of Na on LHS:\n$2Na(s)+2H_{2}O(l)\\rightarrow 2NaOH(aq)+H_{2}(g)$\n\nCheck balancing:\nNa: 2 = 2\nH: 2*2 = 4 (LHS); 2*1 + 2 = 4 (RHS)\nO: 2*1 = 2 (LHS); 2*1 = 2 (RHS)\nThe equation is balanced.\n\nCompare with the options:\n(a) Incorrect balancing for $H_{2}$.\n(b) **Correct balanced equation.**\n(c) Incorrect balancing for $NaOH$ and $H_{2}$.\n(d) Incorrect balancing for $H_{2}O$ and $H_{2}$.\n\nTherefore, the correct answer is **(b)**.",
      },
      {
        id: "Q2-2022",
        text: "It is important to balance the chemical equations to satisfy the law of conservation of mass. Which of the following statements of the law is incorrect? (2022)\n(a) The total mass of the elements present in the reactants is equal to the total mass of the elements present in the products.\n(b) The number of atoms of each element remains the same, before and after a chemical reaction.\n(c) The chemical composition of the reactants is the same before and after the reaction.\n(d) Mass can neither be created nor can it be destroyed in a chemical reaction.",
        solution:
          "The Law of Conservation of Mass states that mass in an isolated system is neither created nor destroyed by chemical reactions or physical transformations. For chemical equations, this means:\n-   The total mass of reactants equals the total mass of products.\n-   The number of atoms of each element remains constant before and after the reaction.\n\nLet's analyze each statement:\n(a) The total mass of the elements present in the reactants is equal to the total mass of the elements present in the products. (True - This is a direct implication of the law).\n(b) The number of atoms of each element remains the same, before and after a chemical reaction. (True - This is why we balance equations; atoms are merely rearranged, not created or destroyed).\n(c) **The chemical composition of the reactants is the same before and after the reaction.** (False - In a chemical reaction, the *chemical composition* of the reactants *changes* as new products are formed. For example, hydrogen and oxygen (reactants) combine to form water (product), which has a different chemical composition).\n(d) Mass can neither be created nor can it be destroyed in a chemical reaction. (True - This is the fundamental statement of the law of conservation of mass).\n\nTherefore, the incorrect statement is **(c)**.",
      },
      {
        id: "Q3-2022",
        text: "$C_{6}H_{12}O_{6}(aq)+6O_{2}(g)\\rightarrow6CO_{2}(g)+6H_{2}O(l)$ This balanced chemical equation represents: (2022)\n(a) Respiration\n(b) Combustion\n(c) Photosynthesis\n(d) Decomposition",
        solution:
          "The given chemical equation is:\n$C_{6}H_{12}O_{6}(aq)+6O_{2}(g)\\rightarrow6CO_{2}(g)+6H_{2}O(l)$\n\nThis equation represents the breakdown of glucose ($C_{6}H_{12}O_{6}$) in the presence of oxygen to produce carbon dioxide and water, releasing energy. This process is known as **respiration** in living organisms.\n\nLet's check the options:\n(a) **Respiration.** (True)\n(b) Combustion: While it is a form of oxidation, the specific context of glucose breakdown in aqueous solution points to respiration.\n(c) Photosynthesis: Photosynthesis is the reverse reaction ($6CO_{2}+6H_{2}O\\rightarrow C_{6}H_{12}O_{6}+6O_{2}$).\n(d) Decomposition: This is not a decomposition reaction as glucose is reacting with oxygen, not breaking down on its own.\n\nTherefore, the correct answer is **(a)**.",
      },
      {
        id: "Q4-2022",
        text: "Which of the following statements about the reaction given below are correct? (2022)\n$MnO_{2}+4HCl\\rightarrow MnCl_{2}+2H_{2}O+Cl_{2}$\n(i) HCL is oxidized to $Cl_{2}$.\n(ii) $MnO_{2}$ is reduced to $MnCl_{2}$.\n(iii) $MnCl_{2}$ acts as an oxidizing agent.\n(iv) HCI acts as an oxidizing agent.\n(a) (ii), (iii) and (iv)\n(b) (i), (ii) and (iii)\n(c) (i) and (ii) only\n(d) (iii) and (iv) only",
        solution:
          "Let's analyze the oxidation states in the reaction: $MnO_{2}+4HCl\\rightarrow MnCl_{2}+2H_{2}O+Cl_{2}$\n\n-   In $MnO_{2}$, Mn has an oxidation state of +4. In $MnCl_{2}$, Mn has an oxidation state of +2. So, Mn goes from +4 to +2, which is a **decrease in oxidation state (reduction)**. Thus, $MnO_{2}$ is reduced.\n-   In $HCl$, Cl has an oxidation state of -1. In $Cl_{2}$, Cl has an oxidation state of 0. So, Cl goes from -1 to 0, which is an **increase in oxidation state (oxidation)**. Thus, HCl is oxidized.\n\nNow let's evaluate the statements:\n(i) **HCl is oxidized to $Cl_{2}$.** (Correct, as Cl's oxidation state increases from -1 to 0).\n(ii) **$MnO_{2}$ is reduced to $MnCl_{2}$.** (Correct, as Mn's oxidation state decreases from +4 to +2).\n(iii) $MnCl_{2}$ acts as an oxidizing agent. (Incorrect, $MnCl_{2}$ is a product, not a reactant in this context acting as oxidizing agent).\n(iv) HCl acts as an oxidizing agent. (Incorrect, HCl is oxidized, so it acts as a reducing agent in this reaction).\n\nTherefore, only statements (i) and (ii) are correct.\nThe correct answer is **(c)**.",
      },
      {
        id: "Q5-2022",
        text: "Assertion (A): Burning of natural gas is an endothermic process.\nReason (R): Methane gas combines with oxygen to produce carbon dioxide and water. (2022)\n(a) Both (A) and (R) are true and (R) is the correct explanation of (A).\n(b) Both (A) and (R) are true but (R) is not the correct explanation of (A).\n(c) (A) is true, but (R) is false.\n(d) (A) is false, but (R) is true.",
        solution:
          "Let's analyze the Assertion (A) and Reason (R):\n\nAssertion (A): Burning of natural gas is an endothermic process. (False) - Burning (combustion) of natural gas (methane) is a highly **exothermic** process, releasing a large amount of heat and light.\nReason (R): Methane gas combines with oxygen to produce carbon dioxide and water. (True) - This correctly describes the chemical reaction for the combustion of methane.\n\nSince Assertion (A) is false, and Reason (R) is true.\nTherefore, the correct answer is **(d)**.",
      },
      {
        id: "Q6-2022",
        text: "Consider the following processes\nI. Dilution of sulphuric acid\nII. Sublimation of dry ice\nIII. Condensation of water vapours\nIV. Dissolution of ammonium chloride in water\nThe endothermic process(es) is/are (2022)\n(a) I and III\n(b) II only\n(c) III only\n(d) II and IV",
        solution:
          "An **endothermic process** is one that absorbs heat from its surroundings, causing the surroundings to cool down.\n\nLet's analyze each process:\nI. **Dilution of sulfuric acid:** Highly **exothermic** (releases heat, solution gets hot).\nII. **Sublimation of dry ice:** Dry ice is solid $CO_{2}$. Sublimation (solid to gas) requires energy absorption. So, it is **endothermic**.\nIII. **Condensation of water vapors:** Condensation (gas to liquid) is a process where a substance releases latent heat. So, it is **exothermic**.\nIV. **Dissolution of ammonium chloride in water:** When ammonium chloride dissolves in water, the solution gets noticeably cold, indicating that it absorbs heat from the surroundings. So, it is **endothermic**.\n\nTherefore, the endothermic processes are II and IV.\nThe correct answer is **(d)**.",
      },
      {
        id: "Q7-2022",
        text: "When lead nitrate powder is heated in a boiling tube. we observe (2022)\n(a) Brown fumes of nitrogen dioxide\n(b) Brown fumes of lead oxide\n(c) Yellow fumes of nitrogen dioxide\n(d) Brown fumes of nitric oxide.",
        solution:
          "When lead nitrate powder is heated, it undergoes thermal decomposition:\n$2Pb(NO_{3})_{2}(s)\\xrightarrow{Heat} 2PbO(s)+4NO_{2}(g)+O_{2}(g)$\n\n-   Lead oxide (PbO) is a yellow solid, not brown fumes.\n-   Nitrogen dioxide ($NO_{2}$) is a gas that produces **brown fumes**.\n-   Nitric oxide (NO) is a colorless gas, which can turn brown in the presence of oxygen, but the direct product that gives brown fumes is $NO_{2}$.\n\nTherefore, the observation is brown fumes of nitrogen dioxide.\nThe correct answer is **(a)**.",
      },
      {
        id: "Q8-2022",
        text: "Assertion (A): Silver salts are used in black-and-white photography.\nReason (R): Silver salts do not decompose in the presence of light. (2022)\n(a) Both (A) and (R) are true and (R) is the correct explanation of (A).\n(b) Both (A) and (R) are true but (R) is not the correct explanation of (A).\n(c) (A) is true, but (R) is false.\n(d) (A) is false, but (R) is true.",
        solution:
          "Let's analyze the Assertion (A) and Reason (R):\n\nAssertion (A): Silver salts are used in black-and-white photography. (True) - Silver halides (like AgCl, AgBr) are indeed used.\nReason (R): Silver salts do not decompose in the presence of light. (False) - Silver salts, especially silver bromide and silver chloride, are known to **decompose in the presence of light** (photodecomposition). This property is precisely why they are used in black-and-white photography, as the decomposition of silver halide forms elemental silver (which is black), creating the image.\n\nTherefore, Assertion (A) is true, but Reason (R) is false.\nThe correct answer is **(c)**.",
      },
      {
        id: "Q9-2022",
        text: "Mention with reason the colour changes observed when:\n(A) Silver chloride is exposed to sunlight\n(B) Copper powder is strongly heated in the presence of oxygen\n(C) A piece of zinc is dropped in copper sulphate solution. (2022)",
        solution:
          "Here are the color changes and reasons:\n\n(A) **Silver chloride is exposed to sunlight:**\n    * **Colour Change:** White silver chloride ($AgCl$) turns **greyish-black**.\n    * **Reason:** This is due to the **photolytic decomposition** of silver chloride into silver metal (which is greyish-black) and chlorine gas when exposed to light.\n        Equation: $2AgCl(s)\\xrightarrow{Sunlight} 2Ag(s)+Cl_{2}(g)$\n\n(B) **Copper powder is strongly heated in the presence of oxygen:**\n    * **Colour Change:** The reddish-brown copper powder turns **black**.\n    * **Reason:** This is due to the **oxidation** of copper metal to black copper(II) oxide when it reacts with oxygen from the air upon heating.\n        Equation: $2Cu(s)+O_{2}(g)\\xrightarrow{Heat} 2CuO(s)$\n\n(C) **A piece of zinc is dropped in copper sulphate solution:**\n    * **Colour Change:** The **blue colour** of the copper sulfate solution fades and eventually becomes **colorless** (or forms a white precipitate of zinc sulfate, which is colorless in solution) and a **reddish-brown coating** forms on the zinc metal.\n    * **Reason:** This is a **displacement reaction**. Zinc is more reactive than copper, so it displaces copper from its sulfate solution. Zinc metal gets oxidized to zinc sulfate (colorless in solution), and copper ions are reduced to copper metal (reddish-brown solid), which deposits on the zinc piece.\n        Equation: $Zn(s)+CuSO_{4}(aq)\\rightarrow ZnSO_{4}(aq)+Cu(s)$",
      },
      {
        id: "Q10-2022",
        text: "A shining metal 'M', on burning gives a dazzling white flame and changes to a white powder 'N'.\n(a) Identify 'M' and 'N'.\n(b) Represent the above reaction in the form of a balanced chemical equation.\n(c) Does 'M' undergo oxidation or reduction in this reaction? Justify. (2022)",
        solution:
          "(a) **Identification:**\n    * Metal 'M': The metal that burns with a dazzling white flame is **Magnesium (Mg)**.\n    * White powder 'N': The white powder formed is **Magnesium oxide (MgO)**.\n\n(b) **Balanced chemical equation:**\n    $2Mg(s)+O_{2}(g)\\rightarrow 2MgO(s)$\n\n(c) **Oxidation or Reduction of 'M' (Magnesium):**\n    * Magnesium ('M') undergoes **oxidation** in this reaction.\n    * **Justification:** Oxidation is the gain of oxygen or loss of electrons. In this reaction, magnesium metal combines with oxygen to form magnesium oxide, meaning magnesium **gains oxygen**. Therefore, it is oxidized. Also, magnesium changes its oxidation state from 0 to +2, which is an increase in oxidation state, indicating oxidation.",
      },
    ],
    2021: [
      {
        id: "Q1-2021",
        text: "What is a balanced chemical equation? (2021 C)",
        solution:
          "A **balanced chemical equation** is a chemical equation in which the number of atoms of each element on the reactant side (left side) is equal to the number of atoms of the same element on the product side (right side). This ensures that the equation adheres to the Law of Conservation of Mass, which states that matter cannot be created or destroyed in a chemical reaction.",
      },
      {
        id: "Q2-2021",
        text: "Name the type of chemical reaction that takes place when quicklime is added to water. (2021 C)",
        solution:
          "When quicklime (calcium oxide, CaO) is added to water ($H_{2}O$), it forms calcium hydroxide ($Ca(OH)_{2}$) and releases heat. This reaction is a **combination reaction** (as two reactants combine to form a single product) and also an **exothermic reaction** (as heat is released).",
      },
      {
        id: "Q3-2021",
        text: "Give the chemical name of the reactants as well as the products of the following chemical equation: (2021 C)\n$HNO_{3}+Ca(OH)_{2}\\rightarrow Ca(NO_{3})_{2}+H_{2}O$",
        solution:
          "For the chemical equation: $HNO_{3}+Ca(OH)_{2}\\rightarrow Ca(NO_{3})_{2}+H_{2}O$\n\n**Reactants:**\n* $HNO_{3}$: **Nitric acid**\n* $Ca(OH)_{2}$: **Calcium hydroxide**\n\n**Products:**\n* $Ca(NO_{3})_{2}$: **Calcium nitrate**\n* $H_{2}O$: **Water**",
      },
      {
        id: "Q4-2021",
        text: "Assertion (A): Burning of natural gas is an endothermic process.\nReason (R): Methane gas combines with oxygen to produce carbon dioxide and water. (CBSE Term-1 2021)\n(a) Both (A) and (R) are true, and (R) is the correct explanation of (A).\n(b) Both (A) and (R) are true, and (R) is not the correct explanation of (A).\n(c) (A) is true but (R) is false.\n(d) (A) is false but (R) is true.",
        solution:
          "Let's analyze the Assertion (A) and Reason (R):\n\nAssertion (A): Burning of natural gas is an endothermic process. (False) - Burning (combustion) is typically an exothermic process, releasing heat.\nReason (R): Methane gas combines with oxygen to produce carbon dioxide and water. (True) - This is the correct chemical description of natural gas combustion.\n\nTherefore, Assertion (A) is false, but Reason (R) is true.\nThe correct answer is **(d)**.",
      },
    ],
    2020: [
      {
        id: "Q1-2020",
        text: "In which of the following, the identity of the initial substance remains unchanged? (2020)\n(a) Curdling of milk\n(b) Formation of crystals by process of crystallisation\n(c) Fermentation of grapes\n(d) Digestion of food",
        solution:
          "We are looking for a process where the chemical identity of the substance does not change, indicating a physical change rather than a chemical change.\n\n(a) Curdling of milk: A chemical change, proteins denature.\n(b) **Formation of crystals by process of crystallisation:** This is a physical change where a substance changes its physical state (from dissolved to solid crystalline form) but its chemical composition remains the same.\n(c) Fermentation of grapes: A chemical change, sugars convert to alcohol and carbon dioxide.\n(d) Digestion of food: A chemical change, complex food molecules break down into simpler ones.\n\nTherefore, the correct answer is **(b)**.",
      },
      {
        id: "Q2-2020",
        text: "Assertion (A): The following is a balanced chemical equation for the action of steam on iron:\n$3Fe (s) + 4H_{2}O (g)\\rightarrow Fe_{3}O_{4} (s) + 4H_{2} (g)$\nReason (R): The law of conservation of mass holds good for a chemical equation. (2020)\n(a) Both (A) and (R) are true and (R) is the correct explanation of the assertion (A).\n(b) Both (A) and (R) are true, but (R) is not the correct explanation of the assertion (A).\n(c) (A) is true, but (R) is false.\n(d) (A) is false, but (R) is true.",
        solution:
          "Let's analyze the Assertion (A) and Reason (R):\n\nAssertion (A): The equation $3Fe (s) + 4H_{2}O (g)\\rightarrow Fe_{3}O_{4} (s) + 4H_{2} (g)$ is balanced.\n    * Fe: 3 on LHS, 3 on RHS (Balanced)\n    * H: 4*2 = 8 on LHS, 4*2 = 8 on RHS (Balanced)\n    * O: 4 on LHS, 4 on RHS (Balanced)\n    So, Assertion (A) is True.\n\nReason (R): The law of conservation of mass holds good for a chemical equation. (True) - This is a fundamental law of chemistry.\n\nNow, is Reason (R) the correct explanation of Assertion (A)? Yes, balancing a chemical equation is *done* precisely to satisfy the law of conservation of mass.\n\nTherefore, the correct answer is **(a)**.",
      },
      {
        id: "Q3-2020",
        text: "When hydrogen sulphide gas is passed through a blue solution of copper sulphate, a black precipitate of copper sulphide is obtained and the sulphuric acid so formed remains in the solution. The reaction is an example of a (2020)\n(a) Combination reaction\n(b) Displacement reaction\n(c) Decomposition reaction\n(d) Double displacement reaction.",
        solution:
          "The reaction involves hydrogen sulfide ($H_{2}S$) and copper sulfate ($CuSO_{4}$).\nEquation: $H_{2}S(g)+CuSO_{4}(aq)\\rightarrow CuS(s)+H_{2}SO_{4}(aq)$\n\nIn this reaction, the ions are exchanged: $Cu^{2+}$ from $CuSO_{4}$ combines with $S^{2-}$ from $H_{2}S$ to form $CuS$, and $H^{+}$ from $H_{2}S$ combines with $SO_{4}^{2-}$ from $CuSO_{4}$ to form $H_{2}SO_{4}$. This exchange of ions between two compounds is characteristic of a **double displacement reaction**. The formation of copper sulfide (CuS) as a black precipitate confirms it's also a precipitation reaction.\n\nTherefore, the correct answer is **(d)**.",
      },
      {
        id: "Q4-2020",
        text: "In a double displacement reaction such as the reaction between sodium sulphate solution and barium chloride solution:\n(A) Exchange of atoms takes place\n(B) Exchange of ions takes place\n(C) A precipitate is produced\n(D) An insoluble salt is produced\nThe correct option is (2020)\n(a) (B) and (D)\n(b) (A) and (C)\n(c) Only (B)\n(d) (B), (C) and (D)",
        solution:
          "The reaction between sodium sulfate ($Na_{2}SO_{4}$) and barium chloride ($BaCl_{2}$) is a classic example of a double displacement reaction, specifically a precipitation reaction.\nEquation: $Na_{2}SO_{4}(aq)+BaCl_{2}(aq)\\rightarrow BaSO_{4}(s)+2NaCl(aq)$\n\nLet's analyze the given statements:\n(A) Exchange of atoms takes place: (False) - In chemical reactions, atoms are rearranged, not directly exchanged as whole atoms. It's the ions that exchange partners.\n(B) **Exchange of ions takes place:** (True) - $Na^{+}$ exchanges with $Ba^{2+}$, and $SO_{4}^{2-}$ exchanges with $Cl^{-}$.\n(C) **A precipitate is produced:** (True) - Barium sulfate ($BaSO_{4}$) is formed as a white precipitate.\n(D) **An insoluble salt is produced:** (True) - A precipitate is by definition an insoluble salt (or compound) formed in a solution.\n\nTherefore, statements (B), (C), and (D) are correct.\nThe correct option is **(d)**.",
      },
      {
        id: "Q5-2020",
        text: "Mention with reason the colour changes observed when:\n(i) Silver chloride is exposed to sunlight.\n(ii) copper powder is strongly heated in the presence of oxygen. (2020)",
        solution:
          "Here are the color changes and reasons:\n\n(i) **Silver chloride is exposed to sunlight:**\n    * **Colour Change:** White silver chloride ($AgCl$) turns **greyish-black**.\n    * **Reason:** This is due to the **photolytic decomposition** of silver chloride into silver metal (which is greyish-black) and chlorine gas when exposed to light.\n        Equation: $2AgCl(s)\\xrightarrow{Sunlight} 2Ag(s)+Cl_{2}(g)$\n\n(ii) **Copper powder is strongly heated in the presence of oxygen:**\n    * **Colour Change:** The reddish-brown copper powder turns **black**.\n    * **Reason:** This is due to the **oxidation** of copper metal to black copper(II) oxide when it reacts with oxygen from the air upon heating.\n        Equation: $2Cu(s)+O_{2}(g)\\xrightarrow{Heat} 2CuO(s)$",
      },
      {
        id: "Q6-2020",
        text: "If copper is kept open in the air, it slowly loses its shining brown surface and gains a green coating. It is due to the formation of (2020)\n(a) $CuSO_{4}$\n(b) $CuCO_{3}$\n(c) $Cu(NO_{3})_{2}$\n(d) $CuO$",
        solution:
          "When copper is kept open in the air, it slowly reacts with moisture ($H_{2}O$), carbon dioxide ($CO_{2}$), and oxygen ($O_{2}$) present in the atmosphere to form a green coating. This green coating is a mixture of copper carbonate and copper hydroxide, often simplified to basic copper carbonate.\n\nSpecifically, the primary compound responsible for the green coating is **basic copper carbonate ($CuCO_{3}\\cdot Cu(OH)_{2}$)**, often represented generally as $CuCO_{3}$. Among the given options, $CuCO_{3}$ is the most appropriate.\n\nEquation: $2Cu(s)+H_{2}O(l)+CO_{2}(g)+O_{2}(g)\\rightarrow CuCO_{3}\\cdot Cu(OH)_{2}(s)$ (simplified to show main components)\n\nTherefore, the correct answer is **(b) $CuCO_{3}$** (representing the carbonate component of the green patina).",
      },
      {
        id: "Q7-2020",
        text: "What happens when food materials containing fats and oils are left for a long time? List two observable changes and suggest three ways by which this phenomenon can be prevented. (CBSE 2020)",
        solution:
          "When food materials containing fats and oils are left for a long time, they undergo **rancidity**.\n\n**Two observable changes:**\n1.  **Change in taste:** The food develops an unpleasant, bitter, or sour taste.\n2.  **Change in smell:** The food develops an unpleasant, foul, or rancid smell.\n\n**Three ways by which this phenomenon (rancidity) can be prevented:**\n1.  **Adding antioxidants:** Antioxidants are substances that prevent oxidation. They can be added to fatty foods (e.g., BHA, BHT).\n2.  **Packaging in airtight containers:** Preventing exposure to oxygen (air) slows down the oxidation process.\n3.  **Flushing with inert gas (e.g., nitrogen):** Food items like chips are often packaged in bags flushed with nitrogen gas to remove oxygen and prevent rancidity.\n4.  **Refrigeration:** Keeping food in the refrigerator slows down the rate of oxidation and spoilage by lowering the temperature.",
      },
      {
        id: "Q8-2020",
        text: "In the electrolysis of water\n(a) Name the gases liberated at the anode and cathode.\n(b) Why is it that the volume of gas collected on one electrode is two times that on the other electrode?\n(c) What would happen if dil. H SO is not added to water? (2020)",
        solution:
          "In the electrolysis of water:\n\n(a) **Gases liberated:**\n    * At the **anode (positive electrode): Oxygen gas ($O_{2}$)**\n    * At the **cathode (negative electrode): Hydrogen gas ($H_{2}$)**\n\n(b) **Reason for volume ratio:** The volume of hydrogen gas collected at the cathode is **twice** the volume of oxygen gas collected at the anode. This is because a water molecule ($H_{2}O$) is composed of two hydrogen atoms and one oxygen atom. During electrolysis, water decomposes into hydrogen and oxygen in a 2:1 molar ratio, and thus, a 2:1 volume ratio for gases at the same temperature and pressure.\n    Equation: $2H_{2}O(l)\\xrightarrow{Electricity} 2H_{2}(g)+O_{2}(g)$\n\n(c) **What would happen if dil. $H_{2}SO_{4}$ is not added to water?**\n    If dilute sulfuric acid is not added to water, the electrolysis process would be **very slow or might not occur at all**. Pure water is a poor conductor of electricity because it has very few free ions. The addition of a small amount of acid provides ions ($H^{+}$ and $SO_{4}^{2-}$) in the water, making it conductive and allowing the electric current to pass through effectively for the decomposition reaction to take place.",
      },
      {
        id: "Q9-2020",
        text: "1 g of copper powder was taken in a China dish and heated. What change takes place in healing? When hydrogen gas is passed over this heated substance, a visible change is seen in it. Give the chemical equations of reactions, the name and the colour of the products formed in each case. (2020)",
        solution:
          "This question describes two consecutive reactions involving copper.\n\n**Part 1: Copper powder heated in a China dish.**\n* **Change in heating:** The reddish-brown copper powder turns **black**.\n* **Chemical equation:** $2Cu(s)+O_{2}(g)\\xrightarrow{Heat} 2CuO(s)$\n* **Name of product:** **Copper(II) oxide**.\n* **Colour of product:** **Black**.\n\n**Part 2: Hydrogen gas passed over this heated substance (Copper(II) oxide).**\n* **Visible change:** The black substance (copper(II) oxide) turns back to **reddish-brown** (copper metal).\n* **Chemical equation:** $CuO(s)+H_{2}(g)\\xrightarrow{Heat} Cu(s)+H_{2}O(l)$\n* **Name of product:** **Copper** (and water).\n* **Colour of product:** **Reddish-brown** (copper).",
      },
      {
        id: "Q10-2020",
        text: "A compound 'A' is used in the manufacture of cement. When dissolved in water, it evolves a large amount of heat and forms compound 'B'.\n(i) Identify A and B.\n(ii) Write the chemical equation for the reaction of A with water.\n(iii) List two types of reactions in which this reaction may be classified. (2020)",
        solution:
          "(i) **Identify A and B:**\n    * Compound 'A': A compound used in the manufacture of cement and that reacts vigorously with water evolving heat is **Quicklime (Calcium oxide, CaO)**.\n    * Compound 'B': When quicklime reacts with water, it forms **Slaked lime (Calcium hydroxide, $Ca(OH)_{2}$)**.\n\n(ii) **Chemical equation for the reaction of A with water:**\n    $CaO(s)+H_{2}O(l)\\rightarrow Ca(OH)_{2}(aq) + Heat$\n\n(iii) **Two types of reactions:**\n    1.  **Combination reaction:** Two reactants (CaO and $H_{2}O$) combine to form a single product ($Ca(OH)_{2}$). (The main classification)\n    2.  **Exothermic reaction:** A large amount of heat is evolved during the reaction.",
      },
      {
        id: "Q11-2020",
        text: "Identify the type of each of the following reactions. Also, write a balanced chemical equation for each reaction.\n(i) A reaction in which the reaction mixture becomes warm.\n(ii) A reaction in which an insoluble substance is formed. (2020)",
        solution:
          "Here are the types and balanced chemical equations for the described reactions:\n\n(i) **A reaction in which the reaction mixture becomes warm (Exothermic reaction):**\n    * **Type of reaction:** **Combination reaction** (and also exothermic reaction).\n    * **Example (Quicklime with water):** When quicklime reacts with water, it produces calcium hydroxide and a large amount of heat.\n        Balanced chemical equation: $CaO(s)+H_{2}O(l)\\rightarrow Ca(OH)_{2}(aq)$\n\n(ii) **A reaction in which an insoluble substance is formed (Precipitation reaction):**\n    * **Type of reaction:** **Double displacement reaction** (specifically, a precipitation reaction).\n    * **Example (Lead nitrate and Potassium iodide):** When aqueous solutions of lead nitrate and potassium iodide are mixed, a yellow precipitate of lead(II) iodide is formed.\n        Balanced chemical equation: $Pb(NO_{3})_{2}(aq)+2KI(aq)\\rightarrow PbI_{2}(s)+2KNO_{3}(aq)$",
      },
      {
        id: "Q12-2020",
        text: "Lead nitrate solution is added to a test tube containing potassium iodide solution.\n(a) Write the name and colour of the compound precipitated.\n(b) Write the balanced chemical equation for the reaction involved.\n(c) Name the type of this reaction justifying your answer. (2020)",
        solution:
          "When lead nitrate solution is added to potassium iodide solution, a chemical reaction occurs, forming a precipitate.\n\n(a) **Name and colour of the compound precipitated:**\n    * Name: **Lead(II) iodide**\n    * Colour: **Yellow**\n\n(b) **Balanced chemical equation for the reaction involved:**\n    $Pb(NO_{3})_{2}(aq)+2KI(aq)\\rightarrow PbI_{2}(s)+2KNO_{3}(aq)$\n\n(c) **Type of reaction and justification:**\n    * Type of reaction: **Double displacement reaction**.\n    * **Justification:** In this reaction, there is an exchange of ions between the two reactant compounds. The lead ions ($Pb^{2+}$) from lead nitrate combine with iodide ions ($I^{-}$) from potassium iodide to form lead(II) iodide ($PbI_{2}$), and potassium ions ($K^{+}$) combine with nitrate ions ($NO_{3}^{-}$) to form potassium nitrate ($KNO_{3}$). Additionally, since an insoluble product ($PbI_{2}$) is formed, it is also specifically a **precipitation reaction**.",
      },
      {
        id: "Q13-2020",
        text: "Studythefiguregivenbelowandanswerthe followingquestions: (CBSE 2020)\nImage of experimental setup: Electrolysis of water, showing gas collection at anode and cathode.\n(A) Name the process depicted in the diagram.\n(B) Write the composition of gases collected at the anode and cathode.\n(C) Write the balanced chemical equation of the reaction taking place in this case.\n(D) The reaction does not take place if a few drops of dilute sulphuric acid are not added to water. Why?",
        diagramText: "Electrolysis of water setup with gas collection.",
        solution:
          "(A) **Name of the process:** The process depicted in the diagram is **Electrolysis of water**.\n\n(B) **Composition of gases collected:**\n    * At the **anode (positive electrode): Oxygen gas ($O_{2}$)**\n    * At the **cathode (negative electrode): Hydrogen gas ($H_{2}$)**\n\n(C) **Balanced chemical equation:**\n    $2H_{2}O(l)\\xrightarrow{Electricity} 2H_{2}(g)+O_{2}(g)$\n\n(D) **Why the reaction does not take place without dilute sulfuric acid:** Pure water is a very poor conductor of electricity because it contains a very small concentration of ions. The addition of a few drops of dilute sulfuric acid acts as an electrolyte, providing a sufficient number of ions ($H^{+}$ and $SO_{4}^{2-}$) in the water, making it conductive and allowing the electric current to pass through effectively for the decomposition reaction to take place.",
      },
    ],
    2019: [
      {
        id: "Q1-2019",
        text: 'Translate the following statement into a balanced chemical equation :\n"Barium chloride reacts with aluminium sulphate to give aluminium chloride and barium sulphate." (CBSE 2019)',
        solution:
          "Let's translate the statement step-by-step:\n\n**Reactants:**\n* Barium chloride: $BaCl_{2}$\n* Aluminium sulphate: $Al_{2}(SO_{4})_{3}$\n\n**Products:**\n* Aluminium chloride: $AlCl_{3}$\n* Barium sulphate: $BaSO_{4}$\n\n**Unbalanced equation:**\n$BaCl_{2}(aq)+Al_{2}(SO_{4})_{3}(aq)\\rightarrow AlCl_{3}(aq)+3BaSO_{4}(s)$\n\n**Balancing the equation:**\n1.  Balance Sulfate ($SO_{4}$): There are 3 sulfate groups on the left, so put 3 in front of $BaSO_{4}$ on the right.\n    $BaCl_{2}(aq)+Al_{2}(SO_{4})_{3}(aq)\\rightarrow AlCl_{3}(aq)+3BaSO_{4}(s)$\n2.  Balance Ba: Now there are 3 Ba on the right, so put 3 in front of $BaCl_{2}$ on the left.\n    $3BaCl_{2}(aq)+Al_{2}(SO_{4})_{3}(aq)\\rightarrow AlCl_{3}(aq)+3BaSO_{4}(s)$\n3.  Balance Al: There are 2 Al on the left, so put 2 in front of $AlCl_{3}$ on the right.\n    $3BaCl_{2}(aq)+Al_{2}(SO_{4})_{3}(aq)\\rightarrow 2AlCl_{3}(aq)+3BaSO_{4}(s)$\n4.  Check Cl: There are $3 \\times 2 = 6$ Cl on the left, and $2 \\times 3 = 6$ Cl on the right. Cl is balanced.\n\n**Balanced chemical equation:**\n$3BaCl_{2}(aq)+Al_{2}(SO_{4})_{3}(aq)\\rightarrow 2AlCl_{3}(aq)+3BaSO_{4}(s)$\n\nThis is a double displacement reaction where barium sulfate is formed as a white precipitate.",
      },
      {
        id: "Q2-2019",
        text: "What is observed after about 1 hour of adding the strips of copper and aluminium separately to the ferrous sulphate solution filled in two beakers? Name the reaction if any change in colour is noticed. Also, write a chemical equation for the reaction. (CBSE 2019)",
        solution:
          "Let's consider the reactivity of Copper (Cu) and Aluminium (Al) relative to Iron (Fe). The reactivity series is: Al > Zn > Fe > Cu > Ag.\n\n1.  **Adding a strip of Copper to Ferrous Sulphate solution:**\n    * **Observation:** No observable change. The green colour of ferrous sulfate solution remains unchanged.\n    * **Reason:** Copper is less reactive than iron, so it cannot displace iron from its salt solution.\n    * **Reaction Name:** No reaction.\n    * **Chemical Equation:** No reaction (or $Cu(s)+FeSO_{4}(aq)\\rightarrow No~Reaction$)\n\n2.  **Adding a strip of Aluminium to Ferrous Sulphate solution:**\n    * **Observation:** The green color of the ferrous sulfate solution starts to fade and eventually disappears. A greyish-black or brownish-black deposit of iron metal is formed on the aluminium strip. The aluminium strip might also start corroding.\n    * **Reason:** Aluminium is more reactive than iron, so it displaces iron from its ferrous sulfate solution.\n    * **Reaction Name:** Displacement reaction.\n    * **Chemical Equation:** $2Al(s)+3FeSO_{4}(aq)\\rightarrow Al_{2}(SO_{4})_{3}(aq)+3Fe(s)$",
      },
      {
        id: "Q3-2019",
        text: "A student wants to study a decomposition reaction by taking ferrous sulphate crystals. Write two precautions he must observe while performing the experiment. (CBSE 2019)",
        solution:
          "The decomposition of ferrous sulfate crystals involves heating them, which produces gases that can be harmful. The reaction is:\n$2FeSO_{4}(s)\\xrightarrow{Heat} Fe_{2}O_{3}(s)+SO_{2}(g)+SO_{3}(g)$\n\nTwo precautions a student must observe while performing this experiment:\n1.  **Safety with gases:** Sulfur dioxide ($SO_{2}$) and sulfur trioxide ($SO_{3}$) are pungent-smelling, corrosive, and toxic gases. The student should perform the experiment in a **well-ventilated area or under a fume hood** to avoid inhaling the gases. The mouth of the boiling tube should be directed away from themselves and others.\n2.  **Handling hot glassware and avoiding backflow:** The boiling tube will become very hot. The student should use **test tube holders** to handle the hot boiling tube. Also, if there is any moisture on the outside of the boiling tube or if the products condense in cooler parts of the tube and then flow back onto the hot glass, it could cause the glass to crack or break. The student should ensure the boiling tube is dry and the setup prevents backflow (e.g., by slightly tilting the boiling tube downwards at the mouth if condensed water is a concern, though for gases, directing away is primary).",
      },
      {
        id: "Q4-2019",
        text: "2 g of silver chloride is taken in a China dish, and the China dish is placed in sunlight for some time. What will be your observation in this case? Write the chemical reaction involved in the form of a balanced chemical equation. Identify the type of chemical reaction. (Delhi 2019)",
        solution:
          "When 2 g of silver chloride is taken in a China dish and placed in sunlight for some time:\n\n**Observation:** The white-colored silver chloride ($AgCl$) will gradually turn **greyish-black**.\n\n**Chemical reaction involved (balanced chemical equation):**\n$2AgCl(s)\\xrightarrow{Sunlight} 2Ag(s)+Cl_{2}(g)$\n\n**Type of chemical reaction:** This is a **photolytic decomposition reaction** (or photodecomposition). It is a decomposition reaction because a single compound ($AgCl$) breaks down into simpler substances ($Ag$ and $Cl_{2}$), and it is photolytic because it is driven by light energy.",
      },
      {
        id: "Q5-2019",
        text: "Identify the type of reactions taking place in each of the following cases and write the balanced chemical equation for the reactions.\n(a) Zinc reacts with silver nitrate to produce zinc nitrate and silver.\n(b) Potassium iodide reacts with lead nitrate to produce potassium nitrate and lead iodide. (CBSE 2019)",
        solution:
          "(a) **Zinc reacts with silver nitrate to produce zinc nitrate and silver.**\n    * **Type of reaction:** **Displacement reaction**.\n        * Justification: Zinc is more reactive than silver, so it displaces silver from its salt solution.\n    * **Balanced chemical equation:**\n        $Zn(s)+2AgNO_{3}(aq)\\rightarrow Zn(NO_{3})_{2}(aq)+2Ag(s)$\n\n(b) **Potassium iodide reacts with lead nitrate to produce potassium nitrate and lead iodide.**\n    * **Type of reaction:** **Double displacement reaction**.\n        * Justification: There is an exchange of ions between the two reactant compounds. This reaction also forms an insoluble precipitate ($PbI_{2}$), so it's specifically a precipitation reaction.\n    * **Balanced chemical equation:**\n        $2KI(aq)+Pb(NO_{3})_{2}(aq)\\rightarrow PbI_{2}(s)+2KNO_{3}(aq)$",
      },
      {
        id: "Q6-2019",
        text: "When potassium iodide solution is added to a solution of lead (II) nitrate in a test tube, a precipitate is formed.\n(a) What is the colour of this precipitate? Name the compound precipitated.\n(b) Write the balanced chemical equation for this reaction.\n(c) List two types of reactions in which this reaction can be placed. (2019)",
        solution:
          "When potassium iodide solution is added to a solution of lead (II) nitrate:\n\n(a) **Colour and name of the compound precipitated:**\n    * Colour: **Yellow**\n    * Name: **Lead(II) iodide ($PbI_{2}$)**\n\n(b) **Balanced chemical equation for this reaction:**\n    $Pb(NO_{3})_{2}(aq)+2KI(aq)\\rightarrow PbI_{2}(s)+2KNO_{3}(aq)$\n\n(c) **Two types of reactions:**\n    1.  **Double displacement reaction:** This is because there is an exchange of ions between the two reactant compounds ($Pb^{2+}$ with $I^{-}$ and $K^{+}$ with $NO_{3}^{-}$).\n    2.  **Precipitation reaction:** This is because an insoluble solid product (precipitate), lead(II) iodide ($PbI_{2}$), is formed.",
      },
      {
        id: "Q7-2019",
        text: "2 g of ferrous sulfate crystals are heated in a dry boiling tube. (a) List any two observations. (b) Name the type of chemical reaction taking place. (c) Write a balanced chemical equation for the reaction and name the products formed. (Al 2019, Board Term 1, 2017, 2016)",
        solution:
          "When 2 g of ferrous sulfate ($FeSO_{4}$) crystals are heated in a dry boiling tube, they undergo thermal decomposition.\n\n(a) **Any two observations:**\n    1.  The light green color of ferrous sulfate crystals changes to reddish-brown (due to the formation of ferric oxide).\n    2.  A characteristic pungent smell of burning sulfur is evolved (due to sulfur dioxide and sulfur trioxide gases).\n    3.  Brown fumes might be observed (due to sulfur trioxide, which is not always clearly visible, but the pungent smell is a strong indicator of the gases).\n\n(b) **Type of chemical reaction:** **Decomposition reaction** (specifically, thermal decomposition).\n\n(c) **Balanced chemical equation and products:**\n    $2FeSO_{4}(s)\\xrightarrow{Heat} Fe_{2}O_{3}(s)+SO_{2}(g)+SO_{3}(g)$\n\n    * **Products formed:**\n        * **Ferric oxide ($Fe_{2}O_{3}$)** (reddish-brown solid)\n        * **Sulfur dioxide ($SO_{2}$)** (pungent smelling gas)\n        * **Sulfur trioxide ($SO_{3}$)** (pungent smelling gas)",
      },
      {
        id: "Q8-2019",
        text: "You might have noted that when copper powder is heated in a China dish, the reddish-brown surface of copper powder becomes coated with a black substance.\n(a) Why has this black substance formed?\n(b) What is the black substance?\n(c) Write the chemical equation of the reaction that takes place.\n(d) How can the black coating on the surface be turned reddish-brown? (Al 2019)",
        solution:
          "(a) **Why this black substance formed:** The black substance is formed because copper metal reacts with oxygen present in the air when heated. Copper undergoes oxidation.\n\n(b) **What is the black substance?** The black substance is **Copper(II) oxide (CuO)**.\n\n(c) **Chemical equation of the reaction that takes place:**\n    $2Cu(s)+O_{2}(g)\\xrightarrow{Heat} 2CuO(s)$\n\n(d) **How can the black coating on the surface be turned reddish-brown?** The black copper(II) oxide coating can be turned back to reddish-brown copper metal by **passing hydrogen gas (or any other reducing agent like carbon monoxide) over the heated black substance**. This is a reduction reaction where copper(II) oxide loses oxygen.\n    Equation: $CuO(s)+H_{2}(g)\\xrightarrow{Heat} Cu(s)+H_{2}O(l)$",
      },
      {
        id: "Q9-2019",
        text: "(A) Design an activity to demonstrate the decomposition reaction of lead nitrate.\n(B) Draw a labelled diagram of the experimental set-up. List two main observations.\n(C) Write a balanced chemical equation for the reaction stating the physical state of the reactant and the products. (CBSE 2019)",
        solution:
          "(A) **Activity to demonstrate the decomposition reaction of lead nitrate:**\n    * **Aim:** To demonstrate the thermal decomposition of lead nitrate.\n    * **Materials:** Lead(II) nitrate crystals, boiling tube, test tube holder, Bunsen burner, clamp stand.\n    * **Procedure:** Take about 2g of lead(II) nitrate powder in a clean, dry boiling tube. Hold the boiling tube with a test tube holder and heat it strongly over a Bunsen burner. Observe the changes in the boiling tube and any gases evolved. Test the evolved gas (e.g., by bringing a glowing splint near the mouth of the tube or passing it through lime water).\n\n(B) **Labelled diagram of the experimental set-up:** (Requires a hand-drawn diagram or image)\n    * **Diagram Description:** Draw a clamp stand holding a boiling tube. The boiling tube should contain lead nitrate powder at the bottom. A Bunsen burner should be placed underneath the boiling tube to heat it. Show an arrow indicating brown fumes emerging from the mouth of the boiling tube. Ensure the mouth of the boiling tube is directed away from the student.\n\n    **Two main observations:**\n    1.  The white lead(II) nitrate powder melts and then decomposes, producing a **yellowish-brown residue (lead(II) oxide)**.\n    2.  **Brown fumes** (of nitrogen dioxide gas) are evolved.\n    3.  A colorless gas (oxygen) is also evolved, which relights a glowing splint.\n\n(C) **Balanced chemical equation with physical states:**\n    $2Pb(NO_{3})_{2}(s)\\xrightarrow{Heat} 2PbO(s)+4NO_{2}(g)+O_{2}(g)$\n    * Reactant: Lead(II) nitrate (solid)\n    * Products: Lead(II) oxide (solid), Nitrogen dioxide (gas), Oxygen (gas)",
      },
    ],
    2018: [
      {
        id: "Q1-2018",
        text: "Decomposition reactions require energy either in the form of heat or light or electricity to break down the reactants. Write one equation each for decomposition reactions where energy is supplied in the form of heat, light, and electricity. (2018)",
        solution:
          "Here is one equation for each type of decomposition reaction based on the energy supplied:\n\n1.  **Decomposition by Heat (Thermal decomposition):**\n    * **Reaction:** Decomposition of calcium carbonate (limestone) when heated.\n    * **Equation:** $CaCO_{3}(s)\\xrightarrow{Heat} CaO(s)+CO_{2}(g)$\n\n2.  **Decomposition by Light (Photolytic decomposition):**\n    * **Reaction:** Decomposition of silver bromide when exposed to sunlight.\n    * **Equation:** $2AgBr(s)\\xrightarrow{Sunlight} 2Ag(s)+Br_{2}(g)$\n\n3.  **Decomposition by Electricity (Electrolytic decomposition):**\n    * **Reaction:** Decomposition of water by passing electric current through it.\n    * **Equation:** $2H_{2}O(l)\\xrightarrow{Electricity} 2H_{2}(g)+O_{2}(g)$",
      },
    ],
    2017: [
      {
        id: "Q1-2017",
        text: "Take 3 g of barium hydroxide in a test tube. Now add about 2 g of ammonium chloride and mix the contents with the help of a glass rod. Now touch the test tube from outside.\n(i) What do you feel about touching the test tube?\n(ii) State the inference about the type of reaction that occurred.\n(iii) Write the balanced chemical equation of the reaction involved. (Board Term 1, 2017)",
        solution:
          "When barium hydroxide and ammonium chloride are mixed, a reaction takes place that involves heat.\n\n(i) **What you feel about touching the test tube?** You will feel that the test tube becomes **cold**.\n\n(ii) **Inference about the type of reaction:** Since the test tube becomes cold, it means the reaction is absorbing heat from the surroundings. Therefore, the reaction is an **endothermic reaction**.\n\n(iii) **Balanced chemical equation of the reaction involved:**\n    $Ba(OH)_{2}(aq)+2NH_{4}Cl(aq)\\rightarrow BaCl_{2}(aq)+2NH_{3}(g)+2H_{2}O(l)$\n    (Note: Ammonia gas, $NH_{3}$, is produced, and it has a characteristic pungent smell.)",
      },
      {
        id: "Q2-2017",
        text: "(a) Can a displacement reaction be a redox reaction? Explain with the help of an example.\n(b) Write the type of chemical reaction in the following:\n(i) Reaction between an acid and a base\n(ii) Rusting of iron. (Board Term I, 2017)",
        solution:
          "(a) **Can a displacement reaction be a redox reaction?**\n    Yes, a displacement reaction **can be a redox reaction**.\n\n    **Explanation with an example:** In a displacement reaction, a more reactive element displaces a less reactive element from its compound. This process invariably involves a change in the oxidation states of the participating elements, meaning one substance is oxidized (loses electrons) and another is reduced (gains electrons).\n\n    **Example:** Reaction of iron with copper sulfate solution.\n    $Fe(s)+CuSO_{4}(aq)\\rightarrow FeSO_{4}(aq)+Cu(s)$\n    * Here, Iron (Fe) goes from an oxidation state of 0 to +2 (in $FeSO_{4}$). It **loses electrons**, so it is **oxidized**.\n    * Copper (Cu) in $CuSO_{4}$ (with oxidation state +2) goes to elemental copper (with oxidation state 0). It **gains electrons**, so it is **reduced**.\n    Since both oxidation and reduction occur simultaneously, this displacement reaction is also a redox reaction.\n\n(b) **Type of chemical reaction:**\n    (i) **Reaction between an acid and a base:** This is a **Neutralisation reaction**. (It is also a type of double displacement reaction, forming salt and water).\n    (ii) **Rusting of iron:** This is an **Oxidation reaction** (specifically, slow oxidation of iron in the presence of oxygen and moisture). It is also a form of redox reaction.",
      },
    ],
    2016: [
      {
        id: "Q1-2016",
        text: "Name the type of chemical reaction represented by the following equation:\n(i) $CaO+H_{2}O\\rightarrow Ca(OH)_{2}$\n(ii) $3BaCl_{2}+Al_{2}(SO_{4})_{3}\\rightarrow 2AlCl_{3}+3BaSO_{4}$\n(iii) $2FeSO_{4}+Heat\\rightarrow Fe_{2}O_{3}+SO_{2}+SO_{3}$ (Board Term 1, 2016)",
        solution:
          "Here are the types of chemical reactions:\n\n(i) $CaO(s)+H_{2}O(l)\\rightarrow Ca(OH)_{2}(aq)$\n    * Type: **Combination reaction** (Two reactants combine to form a single product).\n\n(ii) $3BaCl_{2}(aq)+Al_{2}(SO_{4})_{3}(aq)\\rightarrow 2AlCl_{3}(aq)+3BaSO_{4}(s)$\n    * Type: **Double displacement reaction** (Exchange of ions between two compounds; also a precipitation reaction as $BaSO_{4}$ is formed).\n\n(iii) $2FeSO_{4}(s)\\xrightarrow{Heat} Fe_{2}O_{3}(s)+SO_{2}(g)+SO_{3}(g)$\n    * Type: **Decomposition reaction** (A single compound breaks down into two or more simpler substances upon heating; specifically, thermal decomposition).",
      },
      {
        id: "Q2-2016",
        text: "(a) A solution of potassium chloride when mixed with silver nitrate solution, an insoluble white substance is formed. Write the chemical reaction involved and also mention the type of the chemical reaction. (NCERT Exemplar)\n(b) Ferrous sulfate, when heated, decomposes with the evolution of a gas having a characteristic odor of burning sulfur. Write the chemical reaction involved and identify the type of reaction. (Board Term 1, 2016)",
        solution:
          "(a) **Reaction of potassium chloride with silver nitrate:**\n    * Chemical reaction: $KCl(aq)+AgNO_{3}(aq)\\rightarrow AgCl(s)+KNO_{3}(aq)$\n    * Insoluble white substance formed: Silver chloride (AgCl).\n    * Type of chemical reaction: **Double displacement reaction** (specifically, a precipitation reaction).\n\n(b) **Ferrous sulfate heated:**\n    * Chemical reaction: $2FeSO_{4}(s)\\xrightarrow{Heat} Fe_{2}O_{3}(s)+SO_{2}(g)+SO_{3}(g)$\n    * Characteristic odor of burning sulfur is due to sulfur dioxide ($SO_{2}$) and sulfur trioxide ($SO_{3}$) gases.\n    * Type of reaction: **Decomposition reaction** (specifically, thermal decomposition).",
      },
    ],
    2015: [
      {
        id: "Q1-2015",
        text: "What can be seen when a strip of copper metal is placed in a solution of silver nitrate? (CBSE 2015)",
        solution:
          "When a strip of copper metal is placed in a solution of silver nitrate ($AgNO_{3}$), the following can be seen:\n1.  The **color of the solution gradually turns blue** (due to the formation of copper nitrate, $Cu(NO_{3})_{2}$, which is blue in solution).\n2.  A shiny **greyish-white metallic deposit (silver metal)** is seen forming on the surface of the copper strip.\n\nThis is a displacement reaction:\n$Cu(s)+2AgNO_{3}(aq)\\rightarrow Cu(NO_{3})_{2}(aq)+2Ag(s)$",
      },
      {
        id: "Q2-2015",
        text: "What is a reduction reaction? Identify the substances that are oxidised and the substances that are reduced in the following reactions. (A) $Fe_{2}O_{3}+2Al\\rightarrow Al_{2}O_{3}+2Fe$\n(B) $2PbO+C\\rightarrow 2Pb+CO_{2}$ (CBSE 2015)",
        solution:
          "**Reduction reaction:** A reduction reaction is a chemical process that involves the **gain of hydrogen**, **loss of oxygen**, or **gain of electrons** by a substance.\n\n**Identifying oxidized and reduced substances:**\n\n(A) $Fe_{2}O_{3}+2Al\\rightarrow Al_{2}O_{3}+2Fe$\n    * **Substance oxidized:** **Al (Aluminium)**. It gains oxygen to form $Al_{2}O_{3}$. (Al goes from oxidation state 0 to +3).\n    * **Substance reduced:** **$Fe_{2}O_{3}$ (Ferric oxide)**. It loses oxygen to form Fe. (Fe goes from oxidation state +3 to 0).\n\n(B) $2PbO+C\\rightarrow 2Pb+CO_{2}$\n    * **Substance oxidized:** **C (Carbon)**. It gains oxygen to form $CO_{2}$. (C goes from oxidation state 0 to +4).\n    * **Substance reduced:** **PbO (Lead oxide)**. It loses oxygen to form Pb. (Pb goes from oxidation state +2 to 0).",
      },
    ],
    2012: [
      {
        id: "Q1-2012",
        text: "Name and state the law that is kept in mind when we balance chemical equations. (CBSE 2012)",
        solution:
          "The law that is kept in mind when we balance chemical equations is the **Law of Conservation of Mass**.\n\n**Statement of the law:** The Law of Conservation of Mass states that **mass can neither be created nor destroyed in a chemical reaction**. This means that in any chemical reaction, the total mass of the reactants must be equal to the total mass of the products. Consequently, the number of atoms of each element remains the same before and after a chemical reaction.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 font-inter text-gray-800">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <header className="text-center mb-10 p-6 bg-white rounded-xl shadow-lg border border-orange-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-700 mb-2 drop-shadow-md">
          <span className="block text-xl sm:text-2xl font-medium text-gray-700">
            Welcome to
          </span>
          Vardaan Learning Institute
        </h1>
        <p className="text-xl sm:text-2xl text-orange-600 font-semibold mt-3">
          Master Class 10 Science - Previous Year Questions
        </p>
        <p className="text-lg text-gray-600 italic">
          Your path to success begins here.
        </p>
      </header>

      {Object.keys(questions)
        .sort((a, b) => b.localeCompare(a))
        .map((year) => (
          <section key={year} className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-orange-600 mb-6 pb-2 border-b-2 border-orange-300 text-center">
              Previous Year Questions {year}
            </h2>
            {/* Changed from grid layout to flex column for vertical stacking */}
            <div className="flex flex-col gap-6">
              {questions[year].map((q) => {
                // Split the question text to separate the main question line from the rest
                const lines = q.text.split("\n");
                const firstLine = lines[0];
                const remainingText = lines.slice(1).join("\n");

                return (
                  <div
                    key={q.id}
                    className="bg-white p-6 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    {/* Question ID and Main Question Text */}
                    <div className="mb-2">
                      <span className="text-lg font-bold text-orange-700 mr-2">
                        {q.id}:
                      </span>
                      <span
                        className="text-lg font-medium text-gray-900"
                        dangerouslySetInnerHTML={{
                          __html: renderLatex(firstLine),
                        }}
                      ></span>
                    </div>

                    <div className="flex-grow text-base text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
                      {q.hasDiagram ? (
                        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400 text-gray-600 text-center mb-4 p-4">
                          <p>
                            {q.diagramText}
                            <br />
                            (Diagram/Image not rendered in this text-only
                            display)
                          </p>
                        </div>
                      ) : q.hasTable ? (
                        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400 text-gray-600 text-center mb-4 p-4 overflow-auto">
                          <p>
                            {q.tableText}
                            <br />
                            (Table content not rendered in this text-only
                            display)
                          </p>
                        </div>
                      ) : null}

                      {/* Display the rest of the question text */}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: renderLatex(remainingText),
                        }}
                      ></span>

                      {/* Render options if present */}
                      {q.options && (
                        <ul className="mt-4 space-y-2 text-gray-800 text-base">
                          {q.options.map((option, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">&#8226;</span>{" "}
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: renderLatex(option),
                                }}
                              ></span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* View Solution Button */}
                    <button style={{
                        backgroundColor: "#F97316",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "0.6em 1.2em",
                        fontSize: "1em",
                        fontWeight: "500",
                        fontFamily: "inherit",
                        cursor: "pointer",
                        transition: "border-color 0.25s",
                        boxShadow: "0 2px 8px #ffedd5",
                        
                      
                    }}
                      onClick={() => toggleSolution(q.id)}
                      className="mt-auto py-2 px-4 rounded-lg bg-black text-white font-semibold hover:bg-orange-600 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
                    >
                      {visibleSolutions[q.id]
                        ? "Hide Solution"
                        : "View Solution"}
                    </button>

                    {/* Solution Display Area */}
                    {visibleSolutions[q.id] && (
                      <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200 text-gray-800 animate-fade-in">
                        <h4 className="font-semibold text-orange-600 mb-2">
                          Solution:
                        </h4>
                        <p
                          className="whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{
                            __html: renderLatex(q.solution),
                          }}
                        ></p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

      <footer className="text-center mt-12 p-6 bg-white rounded-xl shadow-lg border border-orange-200 text-gray-600">
        <p>&copy; 2024 Vardaan Learning Institute. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Class10ScienceCbsePYQ;