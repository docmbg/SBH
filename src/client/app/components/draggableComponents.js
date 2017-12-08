export const draggableComponents = [
    {
      type: 'Slider-Component',
      defaultSize: {
        w: 14,
        h: 12,
        minW: 3,
        minH: 3
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
        selectorValue: '',
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
        images: [
        {
          "imgSrc": "https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg"
        }, {
          "imgSrc": "https://fthmb.tqn.com/mJroA0u-j7ROts63xY4oJkosaMs=/3372x2248/filters:no_upscale():fill(transparent,1)/kitten-looking-at-camera-521981437-57d840213df78c583374be3b.jpg"
        }, {
          "imgSrc": "https://www.petsworld.in/blog/wp-content/uploads/2015/09/Happy_Cat_Smiling.jpg"
        }],
      }
    },
    {
      type: 'VerticalNav-Component',
      defaultSize: {
        w: 4,
        h: 9
      },
      innerElementProps: {
        links: [],
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
