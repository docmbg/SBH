export const draggableComponents = [
    {
      type: 'Slider-Component',
      defaultSize: {
        w: 14,
        h: 12,
        minW: 3,
        minH: 3,
      },
      innerElementProps: {
        slides: [
          {
            src: "https://7windsva.com/wp-content/uploads/2012/12/two.png",
            title: "Second Slide",
            link: "2",
            description: "This is a placeholder description."
          }
        ],
        sliderStyles: {
          sliderBackgroundStyle: "slider-shape-square",
          sliderBackgroundColor: "dxc-background-gray--dark",
          sliderButtonColor: "dxc-background-yellow",
          sliderTextColor: "dxc-font-white",
          sliderButtonTextColor: "dxc-font-black",
          sliderBackgroundOpacity: 60,
          sliderImageOpacity: 80,
          sliderIndicatorsStyle: "content-slider-indicators",
          sliderIndicatorsShape: "content-slider-indicators-shape--square_number",
          readMoreText: "Read more"
        }
      }
    },
    {
      type: 'ImageContainer-Component',
      defaultSize: {
        w: 4,
        h: 9
      },
      innerElementProps: {
  
      }
    },
    {
      type: 'VideoComponent-Component',
      defaultSize: {
        w: 4,
        h: 4
      },
      innerElementProps: {
  
      }
    },
    {
      type: 'TextArea-Component',
      defaultSize: {
        w: 14,
        h: 12
      },
      defaultProps: {
  
      }
    },
    {
      type: 'Survey-Component',
      defaultSize: {
        w: 4,
        h: 9
      },
      innerElementProps: {
        iframe: '',
        selectorValue: 'default',
        surveyFilled: '',
      }
    },
    {
      type: 'Calendar-Component',
      defaultSize: {
        w: 4,
        h: 9
      },
      innerElementProps: {
        selectorValue: 'default',
        locationFilter: 'Location',
        categoryFilter: 'Category',
        events: [],
        filteredEvents: [],
        startDate: new Date().toLocaleDateString(),
        endDate: new Date().toLocaleDateString(),
  
      }
    },
    {
      type: 'TabMenu-Component',
      defaultSize: {
        w: 4,
        h: 9
      },
      innerElementProps: {
        tabs: [{
          "title": "Tab 1"
        }, {
          "title": "Tab 2"
        }, {
          "title": "Tab 3"
        }],
        tabStyle: "horizontal",
        currentActiveTab: 0
      }
    },
    {
      type: 'ImageGallery-Component',
      defaultSize: {
        w: 12,
        h: 9
      },
      innerElementProps: {
        
      }
    },
    {
      type: 'VerticalNav-Component',
      defaultSize: {
        w: 4,
        h: 9
      },
      innerElementProps: {
        links: [{
          title : "DXC Technology",
          address : "https://dxc.technology",
          target : "_blank",
          visible: false
        },{
          title : "ABO ABC SharePoint",
          address : "https://hpe.sharepoint.com/teams/DOCM222",
          target : "_blank",
          visible: false
        }],
        linkColor: "",
        linkStyle: "",
        linkInvert: false,
      },
    },
    {
      type: 'HorizontalNav-Component',
      defaultSize: {
        w: 20,
        h: 4
      },
      innerElementProps: {
        tabs: [{
          "name" : "Header 1",
          "link" : "#",
          "active": false,
          "position": 0,
          "children" : []
        },{
          "name" : "Header 2",
          "link" : "#",
          "active": false,  
          "position": 1,        
          "children" : [{
            "name" : "Sub-header 1",
            "link" : "#1",
            "position": 0,
          },{
            "name" : "Sub-header 2",
            "link" : "#2",
            "position": 1,
          }]
        }],
      },
    }
  ];
