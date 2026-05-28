import os
w=os.path.join(os.environ[chr(39)+chr(85)+chr(83)+chr(69)+chr(82)+chr(80)+chr(82)+chr(79)+chr(70)+chr(73)+chr(76)+chr(69)+chr(39)],chr(39)+chr(114)+chr(97)+chr(103)+chr(97)+chr(45)+chr(119)+chr(101)+chr(98)+chr(115)+chr(105)+chr(116)+chr(101)+chr(39))
Q=chr(34)
c=open(os.path.join(w,chr(39)+chr(100)+chr(111)+chr(119)+chr(110)+chr(108)+chr(111)+chr(97)+chr(100)+chr(115)+chr(46)+chr(104)+chr(116)+chr(109)+chr(108)+chr(39)),chr(39)+chr(114)+chr(39),encoding=chr(39)+chr(117)+chr(116)+chr(102)+chr(45)+chr(56)+chr(39)).read()
import re
p=Q+chr(35)+Q
hits=[m for m in re.finditer(p,c)]
print(len(hits),chr(35)+chr(32)+chr(104)+chr(114)+chr(101)+chr(102)+chr(115))
