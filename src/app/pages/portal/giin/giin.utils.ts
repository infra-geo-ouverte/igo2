import { catchError, take } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GiinDistribuerDialogComponent } from './dialog/giin-distribuer-dialog.component'
import { MessageService } from '@igo2/core';
import { GIINResponse } from './giin.interface';
import { EditionWorkspace, Feature, FeatureWorkspace, WfsWorkspace, SearchResult } from '@igo2/geo';
import { BehaviorSubject } from 'rxjs';
import { Workspace } from '@igo2/common';

export function isGiinWksLayer(selectedWorkspace$: BehaviorSubject<Workspace>): boolean {
  const wks = (selectedWorkspace$.value as WfsWorkspace | FeatureWorkspace | EditionWorkspace);
  return wks.layer.title === '2.Index - Mosaïque' || 
  wks.layer.title === '3.Index - Orthophoto' || 
  wks.layer.title === '4.Index - Photo'
}

export function isGiinResult(resultSelected$: BehaviorSubject<SearchResult<Feature>>) {
  const resultSelected = resultSelected$.getValue();
  return resultSelected.source.title === '2.Index - Mosaïque' ||
    resultSelected.source.title === '3.Index - Orthophoto' ||
    resultSelected.source.title === '4.Index - Photo'
}

export function distribuerGiin(dialogWindow: MatDialog, http: HttpClient, messageService: MessageService, giinUuids: string[]) {
 

  dialogWindow.open(GiinDistribuerDialogComponent, { maxHeight: '100vh' })
    .afterClosed()
    .pipe(take(1))
    .subscribe((credentials) => {
      if (!credentials || !credentials?.email || !credentials?.password) {
        return;
      }
      const concatCredentials = btoa(`${credentials.email}:${credentials.password}`);
      const httpOptions = {headers: new HttpHeaders({Authorization: `Basic ${concatCredentials}`})};
      const body = {ListeUUID:giinUuids}
      http.post<GIINResponse>('https://giin.mern.gouv.qc.ca/action/DemanderDistributionImageAerop', body, httpOptions)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          err.error.caught = true;
          const text = "<b>Vous n'êtes pas autorisé à effectuer cette action. </b>" +
          `<br><br>Si vous n'avez pas encore d'accès sécurisé au portail GIIN, veuillez auparavant en faire la demande en suivant la procédure
          <a href="http://intranet.mtqprm.qc/GestInfr/Routieres/Geomatique/Documents/GIIN_Demande_Acces.pdf" target="_blank">Demande_accès_GIIN</a>.`
          messageService.error(text, undefined, {tapToDismiss: false});
        }          
        throw err;
      }))
      .subscribe(r => {
        const commandeTitle = `Commande ${r.numeroDemande}`
        if (r.isFail) {
          const text = 'Erreur de distribution de GIIN';
          messageService.error(text, commandeTitle)
        }
        if (r.isSucces) {
          const text = `Traitement de la demande en cours. Vous recevrez des courriels vous indiquant la marche a suivre pour récupérer votre commande.
          <br><br> La taille estimé de votre commande est de ${r.estimationTailleImages}
          
          <br><br> 
          Après avoir exécuté la commande d'image, vous pourrez récupérer les images en suivant <a href="http://intranet.mtqprm.qc/GestInfr/Routieres/Geomatique/Documents/R%C3%A9cup%C3%A9ration%20des%20images%20GIIN%20par%20FTP_29082022.pdf" target="_blank">la procédure de récupération par FTP</a>.  
            `
          messageService.info(text, commandeTitle, {tapToDismiss: false});
        }
      })
    });

}