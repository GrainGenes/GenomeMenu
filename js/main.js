define([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/Deferred',
        'dojo/dom-construct',
        'dojo/query',
		'dojo/store/Memory',
		'dijit/form/ComboBox',
		'dijit/MenuItem',
		'dijit/MenuSeparator',
        'JBrowse/Plugin'
    ],
       function(
        declare,
        lang,
        Deferred,
        domConstruct,
        query,
		dojoMemoryStore,
		dijitComboBox,
		dijitMenuItem,
		dijitMenuSeparator,
        JBrowsePlugin
       ) {
return declare( JBrowsePlugin,
{
    constructor: function( args ) {
        let thisB = this;
        let browser = this.browser;

        console.log("plugin: GenomeMenu");
        /*
         * class override function intercepts
         */
		
        browser.afterMilestone( 'loadConfig', function() {
			
            // override BlockBased
            require(["dojo/_base/lang", "JBrowse/Browser"], function(lang, Browser){
                lang.extend(Browser, {
                    renderDatasetSelect: function( parent ) {

						var thisB=this;

						if(this.config.classicMenu) {
							var dsconfig = this.config.datasets || {};
							var datasetChoices = [];
							for( var id in dsconfig ) {
								if( ! /^_/.test(id) )
									datasetChoices.push( Object.assign({ id: id }, dsconfig[id] ) );
							}

							const combobox = new dijitComboBox(
								{
									name: 'dataset',
									className: 'dataset_select',
									value: this.config.datasets[this.config.dataset_id].name,
									store: new dojoMemoryStore({
										data: datasetChoices,
									}),
									onChange: dsName => {
										if (!dsName) return false
										const dsID = datasetChoices.find(d => d.name === dsName).id
										const ds = (this.config.datasets||{})[dsID]
										if (ds) window.parent.location = ds.url
										return false
									},
								})
							combobox.placeAt( parent )
							combobox.focusNode.onclick = function() { this.select() }
							if (this.config.datasetSelectorWidth) {
								combobox.domNode.style.width = this.config.datasetSelectorWidth
								combobox.focusNode.style.width = this.config.datasetSelectorWidth
							}
						}
						else {
							if( this.config.datasets && this.config.dataset_id ) {
								this.addGlobalMenuItem( 'dataset',
										new dijitMenuSeparator() );

							for( var id in this.config.datasets ) {
								if( ! /^_/.test(id) ) {
									var dataset = this.config.datasets[id]

									this.addGlobalMenuItem( 'dataset',
										new dijitMenuItem(
										{
											id: 'menubar_dataset_bookmark_' + id,
											label: id == this.config.dataset_id ? ('<b>' + dataset.name + '</b>') : dataset.name,
											iconClass: 'dijitIconBookmark',
											onClick: dojo.hitch( dataset, function() { window.parent.location = this.url } )
										})
									  );
									}
								}
							}
							this.renderGlobalMenu( 'dataset', {text: 'Genome'}, parent );
						}
					}
				});
            });
        });
			
    }
});	
});

