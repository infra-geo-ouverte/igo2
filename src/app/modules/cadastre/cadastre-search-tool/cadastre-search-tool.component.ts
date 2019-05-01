import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';

import { ToolComponent, EntityStore } from '@igo2/common';
import {
  VectorLayer,
  featureToOl,
  Feature,
  moveToOlFeatures,
  Layer,
  ImageLayer,
  ImageLayerOptions,
  LayerService
} from '@igo2/geo';
import { MapState } from '@igo2/integration';

import { Mun, CadastreMunService } from 'src/lib/cadastre/mun';
import {
  Cadastre,
  CadastreFeature,
  CadastreList,
  CadastreCadastreService
} from 'src/lib/cadastre/cadastre';
import {
  ConcessionFeature,
  ConcessionUnique,
  CadastreConcessionService
} from 'src/lib/cadastre/concession';
import { LotUnique, LotFeature, CadastreLotService } from 'src/lib/cadastre/lot';

import { CadastreState } from '../cadastre.state';

@ToolComponent({
  name: 'cadastre',
  title: 'tools.cadastre',
  icon: 'grid_on'
})
@Component({
  selector: 'fadq-cadastre-search-tool',
  templateUrl: './cadastre-search-tool.component.html',
  styleUrls: ['./cadastre-search-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CadastreSearchToolComponent implements OnInit {

  @Input() layerId: string;
  @Input() layerOptions: ImageLayerOptions;

  private imageLayer = undefined;

  /**
   *Enabled  the search button
   */
  get searchDisabled(): boolean { return this.cadastreState.searchDisabled; }

  /**
   * Store that holds all the available Municipalities
   * @return EntityStore<Mun>
   */
  get munStore(): EntityStore<Mun> {
    return this.cadastreState.munStore;
  }

  /**
   * Store that holds all the available Cadastre
   * @return EntityStore<Cadastre>
   */
  get cadastreStore(): EntityStore<Cadastre> {
    return this.cadastreState.cadastreStore;
  }

  /**
   * Store that holds all the available Concession
   * @return EntityStore<Mun>
   */
  get concessionStore(): EntityStore<ConcessionUnique> {
    return this.cadastreState.concessionStore;
  }

  /**
   * Store that holds all the available Lot
   * @return EntityStore<Mun>
   */
  get lotStore(): EntityStore<LotUnique> {
    return this.cadastreState.lotStore;
  }

  /**
   * Layer for the cadastre feature
   * @return VectorLayer
   */
  get layerCadastre(): VectorLayer { return this.cadastreState.layerCadastre; }

  /**
   * Layer for the concession feature
   * @return VectorLayer
   */
  get layerConcession(): VectorLayer { return this.cadastreState.layerConcession; }

  /**
   * Layer for the lot feature
   * @return VectorLayer
   */
  get layerLot(): VectorLayer { return this.cadastreState.layerLot; }

  constructor(
    private mapState: MapState,
    private cadastreState: CadastreState,
    private munService: CadastreMunService,
    private cadastreService: CadastreCadastreService,
    private concessionService: CadastreConcessionService,
    private lotService: CadastreLotService,
    private layerService: LayerService
  ) { }

  ngOnInit() {
    this.loadMuns();
    this.sortMuns();
  }

  /**
   * Reaction on a selected cadastre
   * @param cadastre: Cadastre event
   */
  onSelectionCadastreChange(event: {cadastre: Cadastre}) {
    const cadastre = event.cadastre;

    // get the cadastre Feature
    this.cadastreService.getCadastreFeatureByNum(cadastre.idCadastreOriginaire)
    .subscribe((cadastreList: CadastreFeature) => {

      // intialize the cadastre layer
      this.cadastreState.initCadastreLayer();
      // keep the current Features selected list
      this.cadastreState.currentCadastreFeature$.next(cadastreList);
    });

    // load the concessions related to the selected cadastre
    // this.reloadConcessions(cadastre.noCadastre);
    this.loadConcessions(cadastre.idCadastreOriginaire);

    // reload the lots related to the selected cadastre
    this.loadLots(cadastre.idCadastreOriginaire);

    // enabled the search button
    this.cadastreState.searchDisabled = false;
  }

  /**
   * Reaction on a selected cadastre
   * @param concession: ConcessionUnique event
   */
  onSelectionConcessionChange(event: {concession: ConcessionUnique}) {
    const concession = event.concession;

    this.concessionService.getConcessionFeatureByNum(concession.listeIdConcession)
      .subscribe((concessionList: ConcessionFeature[]) => {
        this.cadastreState.initConcessionLayer();
        this.cadastreState.currentConcessionFeatures$.next(concessionList);
      });
  }

  /**
   * Reaction on a selected cadastre
   * @param lot: LotUnique event
   */
  onSelectionLotChange(event: {lot: LotUnique}) {
    const lot = event.lot;

    this.lotService.getLotFeatureByNum(lot.listeIdLot)
      .subscribe((lotList: LotFeature[]) => {
        this.cadastreState.initLotLayer();
        this.cadastreState.currentLotFeatures$.next(lotList);
      });
  }

  /**
   * Reaction on a search click
   *
   * @param {{mun: Mun}} event
   */
  onSearchClick() {

    if (this.cadastreState.currentCadastreFeature$.value !== undefined) {
      this.showUnCadastre(this.cadastreState.currentCadastreFeature$.value as CadastreFeature);
    }

    if (this.cadastreState.currentConcessionFeatures$.value !== undefined) {
      this.showConcessions(this.cadastreState.currentConcessionFeatures$.value as ConcessionFeature[]);
    }

    if (this.cadastreState.currentLotFeatures$.value !== undefined) {
      this.showLots(this.cadastreState.currentLotFeatures$.value as LotFeature[]);
    }

    // adjust the zoom depending of the Features
    this.adjustZoom();

    // Show the Image layer of cadastre
    this.showCadastreImageLayer(true);
  }

  /**
   * Reaction on a cancel search click
   *
   */
  onSearchCancelClick() {
    // Clear the cadastre
    this.clearCadastres();

    // Clear the concessions
    this.clearConcessions();

    // Clear the Lots
    this.clearLots();

    // Clear the selected mun
    this.munStore.state.updateAll({selected: false});

    // Clear the layers
    if (this.layerCadastre !== undefined) { this.layerCadastre.dataSource.ol.clear(); }
    if (this.layerConcession !== undefined) { this.layerConcession.dataSource.ol.clear(); }
    if (this.layerLot !== undefined) { this.layerLot.dataSource.ol.clear(); }

    // Hide the Image layer of cadastre
    this.showCadastreImageLayer(false);

    // disable the search button
    this.cadastreState.searchDisabled = true;
  }

  /**
   * Load the list of municipalities
   *
   */
  private loadMuns() {
    if (!this.munStore.empty) { return; }

    this.munService.getMuns()
    .subscribe((munList: Mun[]) => {
      this.munStore.load(munList);
    });
  }

  /**
   *Load the of cadastre related to a municipality
   *
   * @param string codeGeographique
   */
  private loadCadastres(codeGeographique: string) {
    if (!this.cadastreStore.empty) { this.cadastreStore.clear(); }

    this.cadastreService.getCadastres(codeGeographique)
    .subscribe((cadastreList: CadastreList) => {
      this.cadastreStore.load(cadastreList);
    });
  }

  /**
   * Load the of concession related to a cadastre
   *
   * @param string codeGeographique
   */
  private loadConcessions(idCadastreOriginaire: number) {
    if (!this.concessionStore.empty) { this.concessionStore.clear(); }

    this.concessionService.getConcessions(idCadastreOriginaire)
    .subscribe((concessionList: ConcessionUnique[]) => {
      this.concessionStore.insertMany(concessionList);
    });

    this.sortConcessions();
  }

  /**
   *Load the of lot related to a cadastre
   *
   * @param string codeGeographique
   */
  private loadLots(idCadastreOriginaire: number) {
    if (!this.lotStore.empty) { this.lotStore.clear(); }

    this.lotService.getLots(idCadastreOriginaire)
    .subscribe((lotList: LotUnique[]) => {
      this.lotStore.insertMany(lotList);
    });

    this.sortLots();
  }

  private sortMuns() {
    this.munStore.view.sort({
      valueAccessor: (munSort: Mun) => munSort.nomMunicipalite,
      direction: 'asc'
    });
  }

  /**
   *Stores the cadastres of the store
   */
  private sortCadastres() {
    this.cadastreStore.view.sort({
      valueAccessor: (cadastreSort: Cadastre) => cadastreSort.codeCadastre,
      direction: 'asc'
    });
    this.sortConcessions();
    this.sortLots();
  }

  /**
   *Sorts the concessions of the store
   */
  private sortConcessions() {
    this.concessionStore.view.sort({
      valueAccessor: (concessionSort: ConcessionUnique) => concessionSort.nomConcession,
      direction: 'asc'
    });
  }

  /**
   *Sorts the lots of the store
   */
  private sortLots() {
    this.lotStore.view.sort({
      valueAccessor: (lotSort: LotUnique) => lotSort.noLot,
      direction: 'asc'
    });
  }

  /**
   * Reaction on a selected municipality
   *
   * @param mun: Mun event
   */
  onSelectionMunChange(event: {mun: Mun}) {
    const mun = event.mun;

    // Clear the cadastre
    this.clearCadastres();

    // Clear the concessions
    this.clearConcessions();

    // Clear the Lots
    this.clearLots();

    this.loadCadastres(mun.codeGeographique);
    this.sortCadastres();
  }

  private clearCadastres() {
    // Clear the store
    this.cadastreStore.clear();

    // clear the current features
    this.cadastreState.currentCadastreFeature$.next(undefined);
  }

  private clearConcessions() {
    // Clear the store
    this.concessionStore.clear();
    // clear the current features
    this.cadastreState.currentConcessionFeatures$.next(undefined);
  }

  private clearLots() {
    // Clear the store
    this.lotStore.clear();
    // clear the current features
    this.cadastreState.currentLotFeatures$.next(undefined);
  }


  /**
   * Show the selected cadastre on the map
   * @param CadastreFeature cadastre
   */
  private showUnCadastre(cadastre: CadastreFeature) {
    if (this.layerCadastre === undefined || this.layerCadastre === undefined) { return; }

    this.layerCadastre.dataSource.ol.clear();

    this.layerCadastre.dataSource.ol.addFeatures(this.featureListToOl([cadastre]));
  }

  /**
   * Show the selected cadastre on the map
   * @param CadastreFeature cadastre
   */
  private showConcessions(concessionList: ConcessionFeature[]) {
    if (this.layerConcession === undefined ||
       this.layerConcession.dataSource === undefined) { return; }

    this.layerConcession.dataSource.ol.clear();

    this.layerConcession.dataSource.ol.addFeatures(this.featureListToOl(concessionList));
  }

  /**
   * Show the selected cadastre on the map
   * @param CadastreFeature cadastre
   */
  private showLots(lotList: LotFeature[]) {
    if (this.layerLot === undefined || this.layerLot.dataSource === undefined) { return; }

    this.layerLot.dataSource.ol.clear();

    this.layerLot.dataSource.ol.addFeatures(this.featureListToOl(lotList));
  }

  private showCadastreImageLayer(visibility: boolean ) {
    if (this.layerId && this.layerOptions === undefined) {

      const layerCadastreImage: Layer = this.mapState.map.getLayerById(this.layerId);
      if (layerCadastreImage !== undefined) { layerCadastreImage.visible = visibility; }

    } else if (this.layerOptions !== undefined) {
      this.layerService.createAsyncLayer(this.layerOptions).subscribe((imageLayer: ImageLayer) => {
        imageLayer.visible = visibility;
        this.cadastreState.layerCadastreImage = imageLayer;
        this.mapState.map.addLayer(imageLayer);
      } );
    }
  }

  /**
   * Adjust the zoom upon the selected features
   */
  private adjustZoom() {
    /*
    If a cadastre is selected, zoom on it
    else if a concession and a lot are selected, zoom on it
    else if a concession is selected, zoom on it
    else if a lot is selected, zoom on it.
    */
   const cadastre = this.cadastreState.currentCadastreFeature$.value;
   const concessions = this.cadastreState.currentConcessionFeatures$.value;
   const lots = this.cadastreState.currentConcessionFeatures$.value;

   let features;
    if (cadastre !== undefined) {
      features =  this.featureListToOl([cadastre]);
    } else if (concessions !== undefined && lots !== undefined) {
      features = this.featureListToOl(concessions).concat(this.featureListToOl(lots));
    } else if (concessions !== undefined) {
      features = this.featureListToOl(concessions);
    } else if (lots !== undefined) {
      features = this.featureListToOl(lots);
    }

    if (features !== undefined) {
      moveToOlFeatures(this.mapState.map, features);
    }
  }

  /**
   * Convert a Feature list to an Ol list
   * @param Feature[] featureList
   * @returns List of Ol Feature
   */
  private featureListToOl(featureList: Feature[]) {
    return featureList.map((feature: Feature) => {
      return featureToOl(feature, this.mapState.map.projection);
    });
  }
}
