% Lectura de datos
float: r;     %porcentaje límite para considerar régimen alto (0r1)
int: dr;     %número de días de espera para evitar el  régimen alto 
int: n;      %Número de días de producción
int: s;     %Número de clientes
int: Cn;    %Costo de producción de central nuclear
int: Ch;   %Costo de producción de central hidroeléctrica
int: Ct;    %Costo de producción de central térmica
int: Pn;  %Max. producción diaria de central nuclear
int: Ph;   %Max. producción diaria de central hidroeléctrica
int: Pt;   %Max. producción diaria de central térmica
array[1..n,1..s] of int:D;   %Demanda diaria     

% Variables
array[1..n] of var int:PN;   %Produccion diaria de central nuclear  
array[1..n] of var int:PH;   %Demanda diaria de central hidroeléctrica   
array[1..n] of var int:PT;   %Demanda diaria de central térmica 

% Se deben satisfacer la demanda diaria:
%constraint forall (i in 1..n) (     
%     PN[i]+PH[i]+PT[i] >= sum (j in 1..s)(D[i,j]) 
     
%);

% No debe sobrepasar la max produccion diaria
constraint forall(i in PN) (PN[i] <= Pn);
constraint forall(i in PH) (PH[i] <= Ph);
constraint forall(i in PT) (PT[i] <= Pt);

% No negatividad
constraint forall(i in PN) (PN[i] >= 0);
constraint forall(i in PH) (PH[i] >= 0);
constraint forall(i in PT) (PT[i] >= 0);

% Maximizar costo
solve minimize sum (i in 1..n) (PN[i]*Cn+PH[i]*Ch+PT[i]*Ct);