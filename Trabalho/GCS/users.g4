/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

grammar users;




jsFile : '[' (('{' TXT ':')? fields)+ ']'
       ;


fields : '{' TXT':' TXT (',' inst)+ ('},' v)? ('},'|'}')
       ;

inst : TXT ':'  TXT         
    | TXT ':[' (TXT (',' TXT)*)? ']'
    ;

v: TXT ':0'
 ;

PAL: [a-zA-Z] [-a-zA-Z_0-9]*;
TXT: [\'] ~[\']* [\'] 
   | [\"] ~[\"]* [\"]
   ;
Sep:('\r'? '\n' | '\t' | ' ')+ ->skip;
Comment:'%%'~('\n')*'\n' ->skip;
