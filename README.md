# Starter Chat

## Installation et exécution

1) Installer [NodeJS Installer](https://nodejs.org/en/download/)

2) Créer un repository pour votre projet

3) Cloner votre repository

4) Récupérer le starter sur votre repository:

```
git remote add starter https://github.com/NablaT/AngularStarter.git
```

Pour vérifier que la commande a réussi, vous pouvez lancer:
```
git remote -v 

Result:
origin https://adresse.com/nomdevotrerepository.git (fetch) 
origin https://adresse.com/nomdevotrerepository.git (push)
starter https://github.com/NablaT/AngularStarter.git (fetch) <-- Le remote starter !
starter https://github.com/NablaT/AngularStarter.git (push) <-- Le remote starter !
```

Ensuite:
```
git pull starter master
```

Vous devriez avoir récupéré tous les fichiers.

5) Installer les dépendances (vous devez vous situez au niveau du package.json)

```
npm install 
```

6) Lancer le projet 

```
npm start
```

7) Ouvrez votre navigateur pour accéder à l'application à l'adresse

```
http://localhost:4200/  
```

## Linter

Pour lancer le linter, run:
 
```
npm run lint
```

## Architecture des fichiers

```
- node_modules <--- Contient toutes les dépendances du projet
- src
 │_ main.ts
 │_ routeur.ts
 │_ index.html
 - app <--- Contient l'ensemble des composants de l'application 
    │_ app.component.html
    │_ app.component.css 
    │_ app.component.spec.ts
    │_ app.component.ts
    │_ README.md
 - shared <--- Contient l'ensemble des éléments partagés par les composants
    - services
      │_ README.md
    - directives
      │_ README.md
    - pipes
      │_ README.md
 - assets <--- Contient l'ensemble des ressources utilisées dans le projet: images, vidéos, sons ...
 - index.html <--- Fichier html racine du projet
 - main.ts <--- Fichier d'entrée 
 
- package.json <--- Contient la configuration du projet: liste des commandes & dépendances du projet
- ...
```

Les fichiers précédemment décris sont les principaux fichiers que vous allez manipuler. Si vous souhaitez avoir plus d'informations concernant les autres fichiers, 
vous trouverez une description dans le [quickstart d'Angular](https://angular.io/docs/ts/latest/cli-quickstart.html#project-file-review)

## Description

### App Component

Le composant App est le composant racine du projet (cad le plus haut). C'est à partir de lui que l'on va utiliser nos composants.

#### Structure

Comme tous les composants du projet, il est composé de 4 fichiers.

```
- app.component.css
- app.component.html
- app.component.ts
- app.component.spec.ts
- app.module.ts
```

<strong> 3 fichiers constituent un composant: </strong>
- Fichier typescript principal: `app.component.ts`. 
Il contient la classe représentant le composant `AppComponent`. 
A l'intérieur on va définir les fichier html et css du composant qui vont constituer sa vue à travers le code suivant:

```
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', <--- Fichier html
  styleUrls: ['./app.component.css'] <--- Fichier de style 
})
```

On précise également le selector. Le selector est le nom utilisé dans les html pour importer un composant.
Dans le fichier index.html à la racine du projet vous pouvez voir l'utilisation du selector:

```
  <app-root>Loading...</app-root>
```

L'utilisation de la balise `<app-root>` permet l'affichage du composant dans la page.
Tous les selectors des composants que vous allez créer doivent avoir le préfix `app-`. Cela va vous permettre de reconnaitre facilement que ce sont 
vos composants et également d'éviter des conflits de nommage avec des balises HTML native (ex: vous ne pouvez pas créer un composant avec le selector div ou body). 
Si vous souhaitez utilisez votre préfix en remplacement de `app-`, ce dernier doivent suivre la structure `nom-`.

- Fichiers css et html.
Comme expliqué précédemment, ces deux fichiers vont permettre de gérer la vue du composant avec les informations à afficher et le style
à utiliser.

<strong> Enfin 2 autres fichiers constituent un composant:</strong>
- Le fichier de test: `app.component.spec.ts`. 
- Le module du composant: AppModule `app.module.ts`: <strong>configuration du composant</strong>.
Le module est un fichier essentiel pour qu'un composant puisse être utilisé car il permet d'importer ses dépendances.

```
@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
```

`declarations` permet la déclaration du composant. Cette étape est obligatoire pour qu'il puisse être utilisé. Tous les composants doivent être déclarés à l'intérieur d'un module. Nous déclarons donc ici tous nos composants.
Si vous ne déclarez pas vos composants, vous aurez l'erreur suivante (cas où MessageListComponent n'est pas déclaré): 
```
'app-message-list' is not a known element:
1. If 'app-message-list' is an Angular component, then verify that it is part of this module.
```

`imports` permet d'importer tous les modules dont le composant a besoin. Chaque module peut contenir un ou plusieurs composants
Ici, les 3 premiers modules sont des modules génériques d'Angular.
- `BrowserModule` permet d'importer toutes les fonctionnalités d'Angular comme les directives `ngIf` ou `ngFor`. Ce module est importé une seule fois dans une application à l'intérieur du composant racine app. Vous n'aurez pas à le réimporter dans d'autres modules.
- `FormsModule` permet d'importer toutes les fonctionnalités liées à l'utilisation des formulares: `Form`, `ngModel` etc ... 
- `HttpModule` permet d'importer les fonctionnalités pour utiliser les requêtes http.  

Si on enlève l'importation de FormsModule à l'intérieur de `MessageFormModule` on obtient l'erreur suivante:
```
 Can't bind to 'ngModel' since it isn't a known property of 'input'.
```
Cette erreur montre que Angular ne connait pas ngModel et cherche ngModel comme étant une propriété de la balise input.

`providers` permet d'importer tous les services, directives et pipes que vous allez utiliser dans le composant App.
Si le service MessageService n'est ajouté dans la liste des providers, vous obtiendrez l'erreur suivante: 
```
No provider for MessageService.
```
`bootstrap` permet de specifier le composant d'entrée de l'application. Ce champ ne doit pas être changé ou réutiliser. Il est présent uniquement dans app.module.ts.

## Debug

`debugger`

Si vous avez besoin de debugger votre code typescript, vous pouvez utiliser le `debugger`. Il s'utilise comme cela:
```
public getMessages(route: string) {
    const finalUrl = this.url + route;
    debugger; <---------------
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateMessageList(response));
}
```

Lorsque votre application va se relancer, elle s'arrêtra au niveau de la ligne du `debugger;`. Vous pouvez à ce moment là utiliser la console de votre navigateur 
pour voir l'état de votre application ou alors utiliser les différentes fonctionnalités du debugger de votre navigateur comme l'avancé step by step. 
Plus d'information sur l'utilisation du [debugger de Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript/). 
 
`console.log()`
Si vous voulez faire apparaitre une variable dans la console de chrome ou faire une trace, vous pouvez simplement utiliser `console.log`:
```
public getMessages(route: string) {
    const finalUrl = this.url + route;
    console.log("Final url: ", finalUrl); <------ 
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateMessageList(response));
}
```

## Liens utiles

### Warning

Attention, nous travaillons avec une version d'Angular supérieure à 2. 
La première version d'Angular appelée Angular 1 ou AngularJS n'est pas compatible avec toutes les versions supérieures à 2 d'Angular (inclue). 
Pour éviter les problèmes de version lors de vos recherches de documentation ou de bugs fix, pensez à préciser <strong> Angular 2 </strong>.

### Liens

Documentation API:

- [Doc](http://projet-3a.7ight.com/docs)
- [Liste des messages Chanel 1](http://projet-3a.7ight.com/api/threads/1/messages)

Documentation Angular 2: 

- [Directives](https://angular.io/docs/ts/latest/guide/attribute-directives.html)
- [Pipes](https://angular.io/docs/ts/latest/guide/pipes.html)
- [Services](https://angular.io/docs/ts/latest/tutorial/toh-pt4.html)
- [Formulaires: "Template Driven Form"](https://angular.io/docs/ts/latest/guide/forms.html)
- [Requêtes HTTP avec Angular](https://angular.io/docs/ts/latest/guide/server-communication.html)
- [NgOnInit](https://angular.io/docs/ts/latest/tutorial/toh-pt4.html#the-ngoninit-lifecycle-hook)
- [@Input et @Ouput](https://angular.io/docs/ts/latest/cookbook/component-communication.html)

Documentation sur les Observables:

- [Documentation Officielle rxjs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)
- [Video Tutoriel débutant FR](http://www.meanjs.fr/rxjs-tutoriel-1-creer-un-observable/)
- [Tutoriel FR](http://home.heeere.com/tech-intro-programmation-reactive.html)
