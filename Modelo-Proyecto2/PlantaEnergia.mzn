% Lectura de datos
float: r;     %porcentaje límite para considerar régimen alto (0r1)
int: dr;     %número de días de espera para evitar el  régimen alto 
int: n;      %Número de días de producción
int: s;     %Número de clientes
float: Cn;    %Costo de producción de central nuclear
float: Ch;   %Costo de producción de central hidroeléctrica
float: Ct;    %Costo de producción de central térmica
int: Pn;  %Max. producción diaria de central nuclear
int: Ph;   %Max. producción diaria de central hidroeléctrica
int: Pt;   %Max. producción diaria de central térmica
array[1..n,1..s] of int:D;   %Demanda diamaximizeria     

% Variables 

%Se define la no negatividad y la maxima produccion de cada central
array[1..n] of var 0..Pn: PN ;   %Produccion diaria de central nuclear  
array[1..n] of var 0..Ph: PH;   %Demanda diaria de central hidroeléctrica   
array[1..n] of var 0..Pt: PT;   %Demanda diaria de central térmica 

% Se deben satisfacer la demanda diaria:
constraint forall (i in 1..n) (     
     PN[i]+PH[i]+PT[i] >= sum (j in 1..s)(D[i,j])      
);

%Se debe evitar que entre en regimen alto durante "dr" dias consecutivos
constraint forall (i in 1..n) (     
  if (i-dr+1)<1 then
    true
  else 
    if forall(j in (i-dr+1)..(i-1))(PH[j]>r*Ph) then
      PH[i]<=r*Ph
    else 
      true
     endif
  endif
    
);

% Funcion Objetivo
var int: costoTotal;
constraint costoTotal=sum (i in 1..n) (PN[i]*Cn+PH[i]*Ch+PT[i]*Ct);
solve minimize costoTotal;
