# Italian Meals App

Applicazione React Native / Expo per esplorare piatti italiani, salvare preferiti, cambiare tema e accedere con un login mock.

## Nome progetto e autore
- Progetto: Italian Meals App
- Autore: Alex Pulerà

---

## Descrizione del progetto
Questa app permette di:
- visualizzare i piatti italiani tramite TheMealDB;
- effettuare il login con utenti mock;
- salvare i preferiti;
- cambiare il tema;
- aprire il dettaglio di un piatto tramite deep link.

---

## Prerequisiti
Prima di eseguire il progetto, assicurati di avere installato:
- Node.js LTS
- npm
- Expo Go sul dispositivo o un emulatore Android/iOS
- Git

---

## Come installare e avviare il progetto
Esegui i seguenti passaggi:

1. Clona il repository:
```bash
git clone <https://github.com/alexpulera-stack/ItalianMealsApp/tree/main/frontend-italian-meals-app>
```

2. Entra nella cartella del progetto:
```bash
cd <ItalianMealsApp>
cd <frontend-italian-meals-app>
```

3. Installa le dipendenze:
```bash
npm install
```

4. Avvia l'applicazione:
```bash
npx expo start / npx expo start --web
```

Dopo l'avvio di Expo:
- premi `a` per aprire l'app su un emulatore Android;
- oppure scansiona il QR code con l'app Expo Go.

---

## API utilizzate
L'app usa l'API pubblica di TheMealDB.

Documentazione ufficiale:
https://www.themealdb.com/api.php

Endpoint utilizzati:
- https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian
- https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}

---

## Utenti mock per il login
| Email     | Password |
| --- | --- |
| mario.rossi@student.it | React2026! |
| giulia.bianchi@student.it | Expo2026! |
| luca.verdi@student.it | Mobile2026! |

---

## Deep linking
Path configurato:
```text
meal/:idMeal
```

Esempio di deep link:
```text
myapp://meal/52771
```

Comando di test tramite Expo:
```text
exp://<indirizzo-ip>:8081/--/meal/52771
```

---

## Google Doc
Link al Google Doc contenente gli screenshot dei laboratori 13–22:
https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?tab=t.8032bg3jfb9o#heading=h.n3u2ew3l2g46

---

## Scelta dello stato globale e motivazione
L'app usa la Context API di React per gestire lo stato globale.

Questa scelta è stata fatta perché consente di condividere facilmente dati tra schermate come:
- utente autenticato;
- tema dell'app;
- lista dei preferiti.

La persistenza dei dati viene gestita con AsyncStorage.

---

## Edge case gestiti
L'app gestisce i seguenti casi:
- assenza di connessione Internet durante il caricamento dei dati;
- credenziali di login non valide;
- lista dei piatti vuota;
- preferiti mantenuti anche dopo il riavvio dell'app;
- deep link con ID non valido o inesistente;
- errori nelle chiamate API.

---

## Feature opzionali implementate
- tema chiaro/scuro;
- ricerca dei piatti;
- preferiti persistenti con AsyncStorage;
- interfaccia responsive;
- supporto al deep linking;
- accessibilità con label e role sui componenti principali.
