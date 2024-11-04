export const latexStart = `
\\documentclass[11pt,a4paper]{article} 									 
\\usepackage{polski}														 	
\\usepackage[utf8]{inputenc}												 	
\\usepackage{amsfonts}													 	
\\usepackage{amsmath}													 	
\\usepackage{amssymb}													 
\\usepackage{array}														 
\\usepackage{color, colortbl}
\\usepackage[usenames,dvipsnames]{xcolor}								 
\\usepackage{colortbl}													 
\\usepackage{enumerate}													 
\\usepackage{enumitem}													 
\\usepackage{float}														 
\\usepackage[margin=2.5cm]{geometry}										 
\\usepackage{hyperref}													 
\\usepackage[none]{hyphenat}												 
\\newcommand{\\info}{\\tiny }												 
\\usepackage{enumitem}													 
\\usepackage{lastpage}	
\\usepackage{longtable, lscape}													 
\\usepackage[labelformat=empty]{caption} % wpis by usunąć numeraję rys.	 
\\usepackage{listings}													 	
\\usepackage{fancyhdr}													 
\\usepackage{graphicx} 													 
\\usepackage{sidecap}													 
\\usepackage{wrapfig}													 
\\usepackage{blindtext}													 
\\usepackage{listings}													 
\\usepackage{sidecap}													 
\\usepackage{subfig}														  
\\usepackage{multirow}

\\usepackage{pgf}                                                    
\\usepackage{pifont}   % znaczki specjalne ding                      
\\usepackage{pgfpages}                                               

\\usepackage{verbatimbox} 											  

\\definecolor{mygreen}{rgb}{0,0.6,0}										 
\\definecolor{mygray}{gray}{0.9}
									 
\\definecolor{mymauve}{rgb}{0.58,0,0.82}									 
 
\\definecolor{LightCyan}{rgb}{0.88,1,1}
 
\\lstset{ 																 
  backgroundcolor=\\color{white},   % choose the background color; you must add \\usepackage{color} or \\usepackage{xcolor} 
  basicstyle=\\footnotesize,        % the size of the fonts that are used for the code 
  breakatwhitespace=false,         % sets if automatic breaks should only happen at whitespace 
  breaklines=true,                 % sets automatic line breaking 
  captionpos=b,                    % sets the caption-position to bottom 
  commentstyle=\\color{mygreen},    % comment style 
  deletekeywords={...},            % if you want to delete keywords from the given language 
  escapeinside={\\%*}{*)},          % if you want to add LaTeX within your code 
  extendedchars=true,              % lets you use non-ASCII characters; for 8-bits encodings only, does not work with UTF-8 
  frame=single,                    % adds a frame around the code 
  keepspaces=true,                 % keeps spaces in text, useful for keeping indentation of code (possibly needs columns=flexible) 
  keywordstyle=\\color{blue},       % keyword style 
  language=Octave,                 % the language of the code 
  morekeywords={*,...},            % if you want to add more keywords to the set 
  numbers=left,                    % where to put the line-numbers; possible values are (none, left, right) 
  numbersep=5pt,                   % how far the line-numbers are from the code 
  numberstyle=\\tiny\\color{mygray}, % the style that is used for the line-numbers 
  rulecolor=\\color{black},         % if not set, the frame-color may be changed on line-breaks within not-black text (e.g. comments (green here)) 
  showspaces=false,                % show spaces everywhere adding particular underscores; it overrides - showstringspaces 
  showstringspaces=false,          % underline spaces within strings only 
  showtabs=false,                  % show tabs within strings adding particular underscores 
  stepnumber=2,                    % the step between two line-numbers. If it is 1, each line will be numbered 
  stringstyle=\\color{mymauve},     % string literal style 
  tabsize=2,                       % sets default tabsize to 2 spaces 
  title=\\lstname ,                 % show the filename of files included with \\lstinputlisting; also try caption instead of title 
  literate={ą}{{\\k{a}}}1												 
  {Ą}{{\\k{A}}}1															 	
  {ę}{{\\k{e}}}1															 	
  {Ę}{{\\k{E}}}1															 	
  {ó}{{\\'o}}1															 
  {Ó}{{\\'O}}1															 
  {ś}{{\\'s}}1															 
  {Ś}{{\\'S}}1															 
  {ł}{{\\l{}}}1															 
  {Ł}{{\\L{}}}1															 
  {ż}{{\\.z}}1															 
  {Ż}{{\\.Z}}1															 	
  {ź}{{\\'z}}1															 
  {Ź}{{\\'Z}}1															 
  {ć}{{\\'c}}1															 
  {Ć}{{\\'C}}1															 
  {ń}{{\\'n}}1															 
  {Ń}{{\\'N}}1															 
  }																		 
   
\\linespread{1.5} % odstępy pomiędzy wierszami   
\\hypersetup{															 	
    colorlinks,															 
    citecolor=black,													 
    filecolor=black,													 
    linkcolor=black,													 
    urlcolor=black														 
    }																	 
    
\\marginparwidth = 15pt                                              
 
\\pagestyle{fancy}														 
	
\\lhead{} % określa lewą część nagłówka									 
\\chead{} % określa środkową część nagłówka								 
\\rhead{} % określa prawą część nagłówka									 
\\lfoot{} % określa lewą czść stopki										 
\\cfoot{\\footnotesize{\\noindent\\rule[0.5cm]{\\textwidth}{1pt}\\tiny{ Michał Mazur Consulting Wola Grzymalina Kolonia 17; 97-410 Kleszczów; Polska Nip: 959-100-16-09} } }  
 
\\rhead { Strona  \\thepage{} z \\pageref*{LastPage}}     
\\pgfpagesdeclarelayout{boxed}                                      
{                                                                        
  \\edef\\pgfpageoptionborder{0pt}                                         
}                                                                         
{                                                                         
  \\pgfpagesphysicalpageoptions                                           
  {%                                                                       
    logical pages=1,%                                                      
  }                                                                      
  \\pgfpageslogicalpageoptions{1}                                         
  {                                                                      
    border code=\\pgfsetlinewidth{2pt}\\pgfstroke,%                        
    border shrink=\\pgfpageoptionborder,%                                 
    resized width=.90\\pgfphysicalwidth,%                                 
    resized height=.95\\pgfphysicalheight,%                                 
    center=\\pgfpoint{.5\\pgfphysicalwidth}{.5\\pgfphysicalheight}%          
  }%                                                                     
}                                                                        
                                                                         
\\pgfpagesuselayout{boxed}                                                 

\\begin{document} 														 
\\title{ARIDA}															 
\\author{Michał Mazur}													 
\\linespread{1.7} %interlinia											 
\\thispagestyle{empty}													 
\\begin{center}
\\Huge{ MICHAŁ MAZUR  \\\\ CONSULTING } \\\\[1.0cm]
\\LARGE{Nip: 959-100-16-09} \\\\[1.0cm]
$ $
\\end{center}
$ $
\\begin{center}
\\LARGE{ ROZLICZENIE DELEGACJI } \\\\[1.0cm]
\\resizebox{!}{0.5cm}{07/2024} \\\\[1.0cm]
$ $
\\end{center}

\\newpage 
\\section{Rozliczenie} 
\\oddsidemargin=-0.4in 
\\scriptsize 
\\begin{longtable}{|c|c|c|c|c|l|l|r|r|r|} \\hline 
L.p. & Delegacja & Wyjazd & Dojazd & Ile & Skąd & Dokąd & Licznik &  Licznik  & Dystans km \\\\
& Numer & Data & Data & Diet & Miejsce & Miejsce & start &  koniec   &  \\\\ \\hline 
`;

export const latexEnd = `
\\end{longtable}  
\\end{document}
`;
