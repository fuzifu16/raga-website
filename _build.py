import os,sys,json
sys.stdout.reconfigure(encoding='utf-8')
w=os.path.join(os.environ['USERPROFILE'],'raga-website')
Q=chr(34)
js=open(os.path.join(w,'js','products-data.js'),'r',encoding='utf-8').read()
