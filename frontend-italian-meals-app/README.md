# Italian Meals App

Applicazione React Native / Expo per esplorare piatti italiani, salvare preferiti, cambiare tema e accedere con un login mock.

## Funzionalità principali
- Login mock con 3 utenti di esempio
- Lista piatti italiani caricata da TheMealDB
- Ricerca per nome piatto
- Preferiti persistenti con AsyncStorage
- Tema chiaro/scuro globale
- Dettaglio piatto con deep link
- Impostazioni utente e logout

## Utenti mock
- mario.rossi@student.it / React2026!
- giulia.bianchi@student.it / Expo2026!
- luca.verdi@student.it / Mobile2026!

## Esecuzione
1. Installa le dipendenze: `npm install`
2. Avvia l’app: `npm start`
3. In alternativa: `npx expo start --web`

## Deep link di esempio
- `myapp://meal/52771`

## API
L’app usa l’API pubblica di TheMealDB:
- `/filter.php?a=Italian`
- `/lookup.php?i={id}`

## Note di consegna
- Stato globale gestito con Context API
- Persistenza con AsyncStorage
- UI responsive per schermi larghi e stretti
- Accessibilità con label e role
