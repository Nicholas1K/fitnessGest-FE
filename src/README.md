in questio gestionale si possono organizzare le attività di un centro fitness, i personal trainer le lezioni che hanno e gli utenti iscritti nel centro fitness

Subscription = pacchetti di iscrizione che offre il centro

Activity of the Week (day week) = sono le attività in base ai giorni della settimana
prende il giorno la data e il corso

Lesson (time table) = si collega a Activity of the week e prende l'inizio della lezione la fine è l'id del Activity of the Week

Day and time work = collega le tabelle Activity of the Week,Lesson e personal trainer, ofrendo una visione completa dell'attivita di quando la si svolge e di chi la svolge

impletazzioni per migliorare il programma:

                                  In Activity of the Week
1 - dalla parte back end fare una get che mostra solo gli ultimi sette elementi in modo di non avere uno storico a vista troppo lungo (fare la quary speciale in repository usare findTop7)

2 - get speciali per trovare tutte le attività per mese, per giorno per anno

                                  In Lesson (Time Tables in BE)
in questa sessione si trovano gli orari delle lezioni nei giorni della settima 

ES: dalle 9 alle 10 lunedì- mercoledì - venerdì Yoga

i collegamenti esterni sono fatti con dayWeek(lista) e Course(singolo)

                                   Info
I collegamenti del programma sono fatti in modo da evitare il cascade in modo da non avere problemi di modifica dei dati involontari, per tanto se vogliamo eliminare un user prima di farlo dobbiamo eliminare i collegamenti a lui riferito di seguito lascio una mappa per il corretto funzionamento

Eliminare un User :
prima eliminare l'indirizzo che ha la chiave esterna verso l'user;

Eliminare un Personal Trainer :
prima eliminare l'indirizzo che ha la chiave esterna verso il Personal Trainer;

Eliminare un Corso :
prima eliminare il personal trainer che ha la chiave esterna verso il corso;

Eliminare un Subscription :
prima eliminare gli user che hanno la chiave esterna verso la Subscription ;

Eliminare un Activity Week : 
prima eliminare i corsi che hanno la chiave esterna verso le Activity Week ;

Eliminare Lesson :
prima eliminare le Activity Week che hanno la chiave esterna verso Lesson ;

Eliminare Day&TimeWork :
prima eliminare le lesson e i personal trainer che hanno la chiave esterna verso Day&TimeWork ;
