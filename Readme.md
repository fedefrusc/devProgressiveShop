# Progressive Store 
Questo progetto va ad analizzare tutte le componenti base affinchè una web app si possa definire progressive.

##Contenuto
Cartelle principali :
> client 
> server

##Avvio in locale client
Scaricare la repository

Per poter avviare in locale l'applicazione è necessario installare tutte le dipendenze presenti nel file
>package.json 
nella cartella client

eseguire il comando 
>npm run dev 

in questo modo si caricherà l'applicazione in locale 

##Avvio in locale serverless

Installare nella cartella serverless questi moduli:
>serverless
>serverless-offline
>serverless-dynamodb-client
>serverless-dynamodb-local

tramite il comando npm install.

Successivamente eseguire il comando 
>serverless offline start 

a questo punto l'applicazione può essere utilizzata in locale 


