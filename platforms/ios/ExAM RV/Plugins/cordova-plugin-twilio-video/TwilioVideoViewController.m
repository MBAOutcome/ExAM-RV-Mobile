#import "TwilioVideoViewController.h"

// CALL EVENTS
NSString *const OPENED = @"OPENED";
NSString *const CONNECTED = @"CONNECTED";
NSString *const CONNECT_FAILURE = @"CONNECT_FAILURE";
NSString *const DISCONNECTED = @"DISCONNECTED";
NSString *const DISCONNECTED_WITH_ERROR = @"DISCONNECTED_WITH_ERROR";
NSString *const RECONNECTING = @"RECONNECTING";
NSString *const RECONNECTED = @"RECONNECTED";
NSString *const PARTICIPANT_CONNECTED = @"PARTICIPANT_CONNECTED";
NSString *const PARTICIPANT_DISCONNECTED = @"PARTICIPANT_DISCONNECTED";
NSString *const AUDIO_TRACK_ADDED = @"AUDIO_TRACK_ADDED";
NSString *const AUDIO_TRACK_REMOVED = @"AUDIO_TRACK_REMOVED";
NSString *const VIDEO_TRACK_ADDED = @"VIDEO_TRACK_ADDED";
NSString *const VIDEO_TRACK_REMOVED = @"VIDEO_TRACK_REMOVED";
NSString *const PERMISSIONS_REQUIRED = @"PERMISSIONS_REQUIRED";
NSString *const HANG_UP = @"HANG_UP";
NSString *const CLOSED = @"CLOSED";

@implementation TwilioVideoViewController

#pragma mark - UIViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [[TwilioVideoManager getInstance] setActionDelegate:self];

    [[TwilioVideoManager getInstance] publishEvent: OPENED];
   // [self.navigationController setNavigationBarHidden:YES animated:NO];
    
    [self logMessage:[NSString stringWithFormat:@"TwilioVideo v%@", [TwilioVideoSDK sdkVersion]]];
    
    // Configure access token for testing. Create one manually in the console
    // at https://www.twilio.com/console/video/runtime/testing-tools
    self.accessToken = @"TWILIO_ACCESS_TOKEN";
    
    // Preview our local camera track in the local video preview view.
    [self startPreview];
    
    // Disconnect and mic button will be displayed when client is connected to a room.
    self.micButton.hidden = YES;
    [self.micButton setImage:[UIImage imageNamed:@"micf"] forState: UIControlStateNormal];
    
    [self.micButton setImage:[UIImage imageNamed:@"no_mic1"] forState: UIControlStateSelected];
     
    [self.videoButton setImage:[UIImage imageNamed:@"videof"] forState: UIControlStateNormal];
    [self.videoButton setImage:[UIImage imageNamed:@"no_video11"] forState: UIControlStateSelected];
    
    // Customize button colors
    NSString *primaryColor = [self.config primaryColorHex];
    if (primaryColor != NULL) {
        self.disconnectButton.backgroundColor = [TwilioVideoConfig colorFromHexString:primaryColor];
    }
    
    NSString *secondaryColor = [self.config secondaryColorHex];
    if (secondaryColor != NULL) {
        self.micButton.backgroundColor = [TwilioVideoConfig colorFromHexString:secondaryColor];
        self.videoButton.backgroundColor = [TwilioVideoConfig colorFromHexString:secondaryColor];
        self.cameraSwitchButton.backgroundColor = [TwilioVideoConfig colorFromHexString:secondaryColor];
    }
    //Added logic for flash light
    
    [self.flashbutton setImage:[UIImage imageNamed:@"flashoff"] forState: UIControlStateNormal];
    [self.flashbutton setImage:[UIImage imageNamed:@"flashon"] forState: UIControlStateSelected];
     self.flashbutton.hidden = YES;
    AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    self.isFlashON = false;
     NSLog(@"istourch available::::%d",[device hasTorch]);
    NSLog([device hasTorch] ? @" istourch Yes" : @" istourch No");

    if ([device hasTorch]) {
        self.isFlashON = false;
    }
 
    self.isMenuopen = false;
   // UIColor *myColor = [self colorWithHexString:[self.config schemacolor]];

    NSString *myColor = [self.config schemacolor];
    if (myColor != NULL) {
        self.HeaderBarView.backgroundColor = [TwilioVideoConfig colorFromHexString:myColor];
        self.LogoView.backgroundColor = [TwilioVideoConfig colorFromHexString:myColor];
        self.statusbarView.backgroundColor = [TwilioVideoConfig colorFromHexString:myColor];
       // self.TittleView.backgroundColor = [TwilioVideoConfig colorFromHexString:myColor];
        
    }

    if(self.config.headerValue){
        self.Tittletext.text = self.config.headerValue;

        self.Tittletext.numberOfLines = 2;
        //[self.TittleView addSubview:self.Tittletext];

     //   self.TittleView.frame = CGRectMake(0,0, 100, 50);
        
       // [self.roomNameLabel  setFrame:CGRectMake(300,25, 300, 50)];
        self.Tittletext.backgroundColor = [UIColor clearColor];
        self.Tittletext.textAlignment = NSTextAlignmentCenter;
        self.Tittletext.textColor = [UIColor whiteColor];
        self.Tittletext.autoresizingMask = UIViewAutoresizingFlexibleWidth |
        UIViewAutoresizingFlexibleHeight| UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;
        self.Tittletext.font = [UIFont systemFontOfSize:20.0];
        self.Tittletext.lineBreakMode = NSLineBreakByWordWrapping;
        
        
        [self.Tittletext setFrame:CGRectMake(50,0,self.HeaderBarView.bounds.size.width-100,50.0)];
       
        
        NSString *txColor = [self.config headerBtnTextColor];
        
        
        UINavigationBar *navbar = [[UINavigationBar alloc]initWithFrame:CGRectMake(0, 0, 64, 64)];
        
        navbar.autoresizingMask = UIViewAutoresizingFlexibleWidth |
        UIViewAutoresizingFlexibleHeight| UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;
        
      navbar.delegate = self;
      UINavigationItem * navItem = [[UINavigationItem alloc] init];

      UIBarButtonItem *buttonRefresh = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonItemStyleBordered
                              target:self
                              action:@selector(aboutButtonPressed:)];
        
        
        
        UIImage *img = [UIImage imageNamed:@"menu-502"];
        UIImage *tintedImage = [img imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate];
        UIImageView *imgVw = [[UIImageView alloc] initWithImage:tintedImage];
        imgVw.frame = CGRectMake(15, 10, 30, 30);
        navbar.autoresizingMask = UIViewAutoresizingFlexibleWidth |
        UIViewAutoresizingFlexibleHeight| UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;
        
        
        if (txColor != NULL) {
            self.Tittletext.textColor = [TwilioVideoConfig colorFromHexString:txColor];
            imgVw.tintColor = [TwilioVideoConfig colorFromHexString:txColor];
        }else{
            self.Tittletext.textColor = [UIColor whiteColor];
        }
        
          navItem.leftBarButtonItem = buttonRefresh;
          navbar.items = @[navItem];
        //  [self.HeaderBarView addSubview:navbar];
        
        
        self.menuButton.hidden= true;
        
        [self.HeaderBarView addSubview:self.Tittletext];
        
        
        
        
        UITapGestureRecognizer *singleTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(menuButtonPressed:)];
       // singleTap.numberOfTapsRequired = 1;
      //  singleTap.numberOfTouchesRequired = 1;
        singleTap.delegate = self;
        [imgVw addGestureRecognizer:singleTap];
       // [singleTap1 release];

        imgVw.userInteractionEnabled = YES; //disabled by default
        
        [self.HeaderBarView addSubview:imgVw];
        
    }
   // UIImage *btnImage = [UIImage imageNamed:@"menu"];
   // [self.menuButton setImage:btnImage forState:UIControlStateNormal];
   // self.menuButton.tintColor = [UIColor whiteColor];
    //self.HeaderBarView.backgroundColor = myColor;

    NSLog(@"color::::",[self.config schemacolor]);
    
   // self.MenuStackView.layoutMargins = UIEdgeInsetsMake(0,0,0,0);
   // [stackView setLayoutMarginsRelativeArrangement:YES];
    

}
// added for custom color picking

-(UIColor*)colorWithHexString:(NSString*)hex
{
    NSString *cString = [[hex stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] uppercaseString];

    // String should be 6 or 8 characters
    if ([cString length] < 6) return [UIColor grayColor];

    // strip 0X if it appears
    if ([cString hasPrefix:@"0X"]) cString = [cString substringFromIndex:2];

    if ([cString length] != 6) return  [UIColor grayColor];

    // Separate into r, g, b substrings
    NSRange range;
    range.location = 0;
    range.length = 2;
    NSString *rString = [cString substringWithRange:range];

    range.location = 2;
    NSString *gString = [cString substringWithRange:range];

    range.location = 4;
    NSString *bString = [cString substringWithRange:range];

    // Scan values
    unsigned int r, g, b;
    [[NSScanner scannerWithString:rString] scanHexInt:&r];
    [[NSScanner scannerWithString:gString] scanHexInt:&g];
    [[NSScanner scannerWithString:bString] scanHexInt:&b];

    return [UIColor colorWithRed:((float) r / 255.0f)
                           green:((float) g / 255.0f)
                            blue:((float) b / 255.0f)
                           alpha:1.0f];
}

-(void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation {
    
   // Added for image logo
      [self.logo setFrame:CGRectMake(10, 10,70,70.0)];

      if(UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad ){
          [self.statusbarView setFrame:CGRectMake(0, 0, self.view.bounds.size.width,85.0)];
          [self.view addSubview:self.statusbarView];
          
          [self.HeaderBarView setFrame:CGRectMake(10, 20, self.view.bounds.size.width-20,65.0)];
       
          [self.view addSubview:self.HeaderBarView];
          
      }else{
          if (CGRectGetWidth(self.view.bounds) > CGRectGetHeight(self.view.bounds)) {
              
              //landscape
              
              [self.statusbarView setFrame:CGRectMake(0, 0, self.view.bounds.size.width,75.0)];
              [self.view addSubview:self.statusbarView];
              [self.HeaderBarView setFrame:CGRectMake(10,5,self.view.bounds.size.width-20,70.0)];
              
              [self.view addSubview:self.HeaderBarView];
            
          } else {
              //portrait
              [self.statusbarView setFrame:CGRectMake(0, 0, self.view.bounds.size.width,95.0)];
              [self.view addSubview:self.statusbarView];
              [self.HeaderBarView setFrame:CGRectMake(10,25,self.view.bounds.size.width-20,70.0)];
              
              [self.view addSubview:self.HeaderBarView];
              
          }
        
                
      }

    self.statusbarView.autoresizingMask = UIViewAutoresizingFlexibleWidth| UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;
     // [self.roomNameLabel setFrame:CGRectMake(self.view.frame.size.width-350,(self.HeaderBarView.frame.size.height/2)-25, 300, 50)];
      self.roomNameLabel.textAlignment = NSTextAlignmentRight;
      self.roomNameLabel.autoresizingMask = UIViewAutoresizingFlexibleWidth |
      UIViewAutoresizingFlexibleHeight| UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;

      //[self.HeaderBarView addSubview:self.roomNameLabel];
           
       self.LoadingIndicatorView.frame = CGRectMake(self.HeaderBarView.frame.size.width-50,(self.HeaderBarView.frame.size.height/2)-25, 50, 50);
       //indicator.center = self.view.center;
       self.LoadingIndicatorView.autoresizingMask = UIViewAutoresizingFlexibleWidth;
       [self.HeaderBarView addSubview:self.LoadingIndicatorView];
    
      
      // Header view start
      self.HeaderBarView.autoresizingMask = UIViewAutoresizingFlexibleWidth| UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;
      
     /* CALayer * externalBorder = [CALayer layer];
      externalBorder.frame = CGRectMake(0,self.HeaderBarView.frame.size.height,self.HeaderBarView.frame.size.width,0.5);
      externalBorder.borderColor = [UIColor blackColor].CGColor;
      externalBorder.borderWidth = 0.5;

      [self.HeaderBarView.layer addSublayer:externalBorder];
      self.HeaderBarView.layer.masksToBounds = NO;*/
      
         
      // End header view------

      // Footer view start---
   
      
      self.ControlButtonStackView.spacing = 5;//newspacing; //fills up leftover space..
      [self.endcallstack addSubview:self.ControlButtonStackView];
    
      self.MenuStackView.spacing = 5;//newspacing; //fills up leftover space..
      [self.ControlButtonStackView addSubview:self.MenuStackView];
    
      self.LogoView.spacing = 5;//newspacing; //fills up leftover space..
      [self.HeaderBarView addSubview:self.LogoView];
    
     self.endcallstack.spacing = 20;//newspacing; //fills up leftover space..
     [self.HeaderBarView addSubview:self.endcallstack];

    
        if (![self isSimulator]) {
           //window preview
           
            if (CGRectGetWidth(self.view.bounds) > CGRectGetHeight(self.view.bounds)) {
              self.remoteView.frame = CGRectMake(self.view.frame.size.width-130,self.view.frame.size.height-250.0, 120,160);
                       
            }else{
                self.remoteView.frame = CGRectMake(self.view.frame.size.width-130,self.view.frame.size.height-250.0, 120,160);
            }
            
            //Added for prevent to show remote view in orietation. only show ,if video is enabled.
            if (self.room  && self.room.remoteParticipants  && self.room.remoteParticipants.count > 0) {
                
                for (int i = 0 ; i < self.room.remoteParticipants.count; i++)
                {
                    if ([[self.config roomownerid] isEqualToString:self.room.remoteParticipants[i].sid]) {
                        
                        TVIRemoteVideoTrack *videoTrack = self.remoteParticipant.remoteVideoTracks[0].remoteTrack;
                        if(self.remoteParticipant.remoteVideoTracks[0].isTrackEnabled){
                           [self.view addSubview:self.remoteView];
                        }
                    }
                }
                
            }

            

        }
    
    //Added image for local view
     
    /* UIGraphicsBeginImageContext(self.view.frame.size);
     [[UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"] drawInRect:CGRectMake(CGRectGetMidX(self.view.frame)-(((self.view.frame.size.width/10)*6)/2),70,(self.view.frame.size.width/10)*6, (self.view.frame.size.height)-150)];
     UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    
     UIGraphicsEndImageContext();

     self.previewView.backgroundColor = [UIColor colorWithPatternImage:image]; */
    
    CGSize sizeBeingScaledTo = CGSizeAspectFit([UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"].size, self.view.frame.size, self.view.bounds);
    
    UIGraphicsBeginImageContext(self.view.frame.size);
       [[UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"] drawInRect:CGRectMake((self.view.frame.size.width / 2)  - (sizeBeingScaledTo.width / 2),
                                                                             (self.view.frame.size.height / 2) - (sizeBeingScaledTo.height / 2),sizeBeingScaledTo.width,sizeBeingScaledTo.height)];
       UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
      
       UIGraphicsEndImageContext();
       
      // self.previewView.backgroundColor = [UIColor colorWithPatternImage:image];
        
     
}
- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    
    //Added for switch window boolean
    self.isSwitchWindow = FALSE;
    
    // Added for image logo
    [self.logo setFrame:CGRectMake(10, 10,70,70.0)];
    
    
      
    if(UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad ){
        
        //Added for statusbar color fix and add fake padding
        [self.statusbarView setFrame:CGRectMake(0, 0, self.view.bounds.size.width,85.0)];
        [self.view addSubview:self.statusbarView];
       

        [self.HeaderBarView setFrame:CGRectMake(10, 20, self.view.bounds.size.width-20,65.0)];
       
        [self.view addSubview:self.HeaderBarView];
        
    }else{
        
        
        if (CGRectGetWidth(self.view.bounds) > CGRectGetHeight(self.view.bounds)) {
            
            //Added for statusbar color fix and add fake padding
            [self.statusbarView setFrame:CGRectMake(0, 0, self.view.bounds.size.width,75.0)];
            [self.view addSubview:self.statusbarView];
            
            [self.HeaderBarView setFrame:CGRectMake(10,5,self.view.bounds.size.width-20,70.0)];
            
            [self.view addSubview:self.HeaderBarView];
            
          
            
          
        } else {
            //Added for statusbar color fix and add fake padding
            [self.statusbarView setFrame:CGRectMake(0, 0, self.view.bounds.size.width,105.0)];
            [self.view addSubview:self.statusbarView];
            
            [self.HeaderBarView setFrame:CGRectMake(10, 40,self.view.bounds.size.width-20,65.0)];
            
            [self.view addSubview:self.HeaderBarView];
            
           

            
        }
      
              
    }
    
    
    
    self.statusbarView.autoresizingMask = UIViewAutoresizingFlexibleWidth| UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;
   
    self.roomNameLabel  = [[UILabel alloc] initWithFrame:CGRectMake(self.view.frame.size.width-350,(self.HeaderBarView.frame.size.height/2)-25, 300, 50)];
    
   // [self.roomNameLabel  setFrame:CGRectMake(300,25, 300, 50)];
    self.roomNameLabel.backgroundColor = [UIColor clearColor];
    self.roomNameLabel.textAlignment = NSTextAlignmentRight;
    self.roomNameLabel.textColor = [UIColor whiteColor];
    self.roomNameLabel.numberOfLines = 0;
    self.roomNameLabel.text = @"Room Name:";
    self.roomNameLabel.autoresizingMask = UIViewAutoresizingFlexibleWidth |
    UIViewAutoresizingFlexibleHeight| UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;
    self.roomNameLabel.font = [UIFont systemFontOfSize:20.0];

    self.roomNameLabel.lineBreakMode = NSLineBreakByWordWrapping;
    
   // [self.HeaderBarView addSubview:self.roomNameLabel];
    
    // Header view start
    
   // self.flashbutton.frame = CGRectMake(self.view.frame.size.width-350,(self.HeaderBarView.frame.size.height/2)-25, 50, 50);
    self.HeaderBarView.autoresizingMask = UIViewAutoresizingFlexibleWidth| UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;
    
   /* CALayer * externalBorder = [CALayer layer];
    externalBorder.frame = CGRectMake(0,self.HeaderBarView.frame.size.height,self.HeaderBarView.frame.size.width,0.5);
    externalBorder.borderColor = [UIColor blackColor].CGColor;
    externalBorder.borderWidth = 0.5;

    [self.HeaderBarView.layer addSublayer:externalBorder];
    self.HeaderBarView.layer.masksToBounds = NO;*/
    
       
    // End header view------

   
   // self.ControlButtonStackView.spacing = 5;//newspacing; //fills up leftover space..
   // [self.endcallstack addSubview:self.ControlButtonStackView];

    self.MenuStackView.spacing = 5;//newspacing; //fills up leftover space..
    [self.ControlButtonStackView addSubview:self.MenuStackView];
    
    self.LogoView.spacing = 5;//newspacing; //fills up leftover space..
    [self.HeaderBarView addSubview:self.LogoView];
    
    [self.HeaderBarView addSubview:self.ControlButtonStackView];

   // self.endcallstack.spacing = 20;//newspacing; //fills up leftover space..
   // [self.HeaderBarView addSubview:self.endcallstack];
    // added loading to get room name
    
    self.LoadingIndicatorView = [[UIActivityIndicatorView alloc]initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
    self.LoadingIndicatorView.frame = CGRectMake(self.HeaderBarView.frame.size.width-50,(self.HeaderBarView.frame.size.height/2)-25, 50, 50);
    //indicator.center = self.view.center;
    [self.HeaderBarView addSubview:self.LoadingIndicatorView];
    self.LoadingIndicatorView.autoresizingMask = UIViewAutoresizingFlexibleWidth;

    [self.LoadingIndicatorView bringSubviewToFront:self.view];
    [UIApplication sharedApplication].networkActivityIndicatorVisible = TRUE;
   // [self.LoadingIndicatorView startAnimating];

    self.LogoView.translatesAutoresizingMaskIntoConstraints = NO;

    self.MenuStackView.translatesAutoresizingMaskIntoConstraints = NO;

    NSLayoutConstraint *centerX1 = [NSLayoutConstraint constraintWithItem:self.ControlButtonStackView
                                                               attribute:NSLayoutAttributeLeft
                                                               relatedBy:NSLayoutRelationEqual
                                                                  toItem:self.HeaderBarView
                                                                attribute:NSLayoutAttributeLeft
                                                              multiplier:1
                                                                constant:0];
    [self.view addConstraint:centerX1];
    NSLayoutConstraint *centerY1 = [NSLayoutConstraint constraintWithItem:self.ControlButtonStackView
                                                                attribute:NSLayoutAttributeTop
                                                               relatedBy:NSLayoutRelationEqual
                                                                  toItem:self.HeaderBarView
                                                                attribute:NSLayoutAttributeTop
                                                              multiplier:1
                                                                constant:0];
    [self.view addConstraint:centerY1];
    
    
    
    //--
   
    NSLayoutConstraint *ccX1 = [NSLayoutConstraint constraintWithItem:self.MenuStackView
                                                               attribute:NSLayoutAttributeLeft
                                                               relatedBy:NSLayoutRelationEqual
                                                                  toItem:self.ControlButtonStackView
                                                                attribute:NSLayoutAttributeLeft
                                                              multiplier:1
                                                                constant:0];
    [self.view addConstraint:ccX1];
    NSLayoutConstraint *ccY1 = [NSLayoutConstraint constraintWithItem:self.MenuStackView
                                                                attribute:NSLayoutAttributeTop
                                                               relatedBy:NSLayoutRelationEqual
                                                                  toItem:self.ControlButtonStackView
                                                                attribute:NSLayoutAttributeTop
                                                              multiplier:1
                                                                constant:0];
    [self.view addConstraint:ccY1];
    
    // It is for left align logo with text.
    NSLayoutConstraint *centerTX1 = [NSLayoutConstraint constraintWithItem:self.LogoView
                                                                  attribute:NSLayoutAttributeRight
                                                                  relatedBy:NSLayoutRelationEqual
                                                                     toItem:self.HeaderBarView
                                                                  attribute:NSLayoutAttributeRight
                                                                 multiplier:1
                                                                   constant:0];
       [self.view addConstraint:centerTX1];
       NSLayoutConstraint *centerTY1 = [NSLayoutConstraint constraintWithItem:self.LogoView
                                                                  attribute:NSLayoutAttributeCenterY
                                                                  relatedBy:NSLayoutRelationEqual
                                                                     toItem:self.HeaderBarView
                                                                  attribute:NSLayoutAttributeCenterY
                                                                 multiplier:1
                                                                   constant:0];
       [self.view addConstraint:centerTY1];
    
    // It is for right align end call.
       NSLayoutConstraint *rightx1 = [NSLayoutConstraint constraintWithItem:self.endcallstack
                                                                     attribute:NSLayoutAttributeLeft
                                                                     relatedBy:NSLayoutRelationEqual
                                                                        toItem:self.HeaderBarView
                                                                     attribute:NSLayoutAttributeLeft
                                                                    multiplier:1
                                                                      constant:0];
          [self.view addConstraint:rightx1];
          NSLayoutConstraint *rightY1 = [NSLayoutConstraint constraintWithItem:self.endcallstack
                                                                     attribute:NSLayoutAttributeCenterY
                                                                     relatedBy:NSLayoutRelationEqual
                                                                        toItem:self.HeaderBarView
                                                                     attribute:NSLayoutAttributeCenterY
                                                                    multiplier:1
                                                                      constant:0];
          [self.view addConstraint:rightY1];
    
    
    if(self.config.headerValue){
        
       
        // It is for center align  text.
       /* NSLayoutConstraint *cTX1 = [NSLayoutConstraint constraintWithItem:self.TittleContainerView
                                                                      attribute:NSLayoutAttributeCenterX
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:self.HeaderBarView
                                                                      attribute:NSLayoutAttributeCenterX
                                                                     multiplier:1
                                                                       constant:0];
           [self.view addConstraint:cTX1];
           NSLayoutConstraint *cTY1 = [NSLayoutConstraint constraintWithItem:self.TittleContainerView
                                                                      attribute:NSLayoutAttributeCenterY
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:self.HeaderBarView
                                                                      attribute:NSLayoutAttributeCenterY
                                                                     multiplier:1
                                                                       constant:0];
           [self.view addConstraint:cTY1]; */
        
       // self.TittleView.textContainer.lineBreakMode = NSLineBreakByCharWrapping;
        

        

    }

    
    NSLayoutConstraint *leftmargin = [NSLayoutConstraint
    constraintWithItem:self.LogoView attribute:NSLayoutAttributeLeft
    relatedBy:NSLayoutRelationEqual toItem:self.HeaderBarView attribute:
    NSLayoutAttributeLeft multiplier:1.0f constant:30];
    
    // [self.view addConstraint:leftmargin];
    
    //Added common switch gesture
    self.remoteActionTap  = [[UITapGestureRecognizer alloc] initWithTarget:self
    action:@selector(switchWidow)];
    
    self.localActionTap  = [[UITapGestureRecognizer alloc] initWithTarget:self
    action:@selector(switchWidow)];
    
    self.aboutActionTap  = [[UITapGestureRecognizer alloc] initWithTarget:self
                                                                   action:@selector(aboutButtonPressed:)];
   
    self.MenuStackView.hidden = true;
    
    self.LogoView.userInteractionEnabled = true;
    
    [self.LogoView addGestureRecognizer:self.aboutActionTap];
    self.aboutActionTap.delegate = self;


    
}

#pragma mark - Public

- (void)connectToRoom:(NSString*)room token:(NSString *)token {
    self.roomName = room;
    self.accessToken = token;
    [self showRoomUI:YES];

    [TwilioVideoPermissions requestRequiredPermissions:^(BOOL grantedPermissions) {
         if (grantedPermissions) {
             [self doConnect];
         } else {
             [[TwilioVideoManager getInstance] publishEvent: PERMISSIONS_REQUIRED];
            // [self handleConnectionError:error.localizedDescription];
             [self handleConnectionError: [self.config i18nConnectionError]];
         }
    }];
}

- (void)aboutButtonPressed:(id)sender {
      
    NSString *str = @"\nVersion - ";
    if(self.config.appversion){
        str = [str stringByAppendingString:self.config.appversion];
    }

    UIAlertController * alert = [UIAlertController
                                 alertControllerWithTitle:@"About"
                                 message: str
                                 preferredStyle:UIAlertControllerStyleAlert];

    NSMutableAttributedString *titleTxt = [[NSMutableAttributedString alloc] initWithString:@"ExAM RV"];

    [titleTxt addAttribute:NSFontAttributeName
                  value:[UIFont systemFontOfSize:20.0]
                  range:NSMakeRange(0, titleTxt.length)];
    [alert setValue:titleTxt forKey:@"attributedTitle"];
    
    

    //Add Buttons
    UIAlertAction* yesButton = [UIAlertAction
                                actionWithTitle:@"Okay" //[self.config i18nAccept]
                                style:UIAlertActionStyleDefault
                                handler: ^(UIAlertAction * action) {
                                   
                                }];
    
    [alert addAction:yesButton];
    [self presentViewController:alert animated:YES completion:nil];
    
   

}
    
- (IBAction)disconnectButtonPressed:(id)sender {
    if ([self.config hangUpInApp]) {
        [[TwilioVideoManager getInstance] publishEvent: HANG_UP];
    } else {
        
        [self logMessage: @"Connection error handled by the plugin"];
        UIAlertController * alert = [UIAlertController
                                     alertControllerWithTitle:@"Leave Room"
                                     message: NULL
                                     preferredStyle:UIAlertControllerStyleAlert];

        NSMutableAttributedString *titleTxt = [[NSMutableAttributedString alloc] initWithString:@"Leave Room"];

        [titleTxt addAttribute:NSFontAttributeName
                      value:[UIFont systemFontOfSize:20.0]
                      range:NSMakeRange(0, titleTxt.length)];
        [alert setValue:titleTxt forKey:@"attributedTitle"];

        //Add Buttons
        UIAlertAction* yesButton = [UIAlertAction
                                    actionWithTitle:@"Leave" //[self.config i18nAccept]
                                    style:UIAlertActionStyleDefault
                                    handler: ^(UIAlertAction * action) {
                                        [self onDisconnect];
                                    }];
        UIAlertAction* cancelButton = [UIAlertAction
        actionWithTitle:@"Cancel" //[self.config i18nAccept]
        style:UIAlertActionStyleDefault
        handler: ^(UIAlertAction * action) {
            //[self onDisconnect];
        }];
        [alert addAction:cancelButton];
        [alert addAction:yesButton];
        [self presentViewController:alert animated:YES completion:nil];
        
       
    }
}

- (void)handlePinchZoom:(UIPinchGestureRecognizer *)pinchRecognizer
{
    AVCaptureDevice *device =[AVCaptureDevice defaultDeviceWithMediaType:
                                                      AVMediaTypeVideo];
    AVCaptureDeviceFormat *format = device.activeFormat;
    CGFloat maxZoomFactor = format.videoMaxZoomFactor;
    NSArray *formats = device.formats;
    const CGFloat pinchVelocityDividerFactor = 2.0f;
    if (pinchRecognizer.state == UIGestureRecognizerStateChanged || pinchRecognizer.state ==UIGestureRecognizerStateBegan)
    {
       NSError *error = nil;
       if ([device lockForConfiguration:&error])
       {
          CGFloat desiredZoomFactor = device.videoZoomFactor +
          atan2f(pinchRecognizer.velocity, pinchVelocityDividerFactor);

          device.videoZoomFactor =   MAX(1.0, MIN(desiredZoomFactor,
                                         device.activeFormat.videoMaxZoomFactor));
          [device unlockForConfiguration];
       }
      else
      {
        NSLog(@"error: %@", error);
      }
    }
 }

- (IBAction)flashPressed:(id)sender {
   AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
   if ([device hasTorch]) {
     //   self.flashbutton.hidden = NO;
       [device lockForConfiguration:nil];
       if(self.isFlashON){
            [device setTorchMode:AVCaptureTorchModeOff];
       }else{
           
           [device setTorchMode:AVCaptureTorchModeOn];  // use AVCaptureTorchModeOff to turn off
       }
       self.isFlashON = !self.isFlashON;
       [self.flashbutton setSelected: self.isFlashON];

       [device unlockForConfiguration];
   }
}

- (IBAction)menuButtonPressed:(id)sender {
    // We will toggle the mic to mute/unmute and change the title according to the user action.
    
    
    if(self.isMenuopen){
        self.MenuStackView.alpha=1;
        [UIView animateWithDuration:0.7
                                  delay:0
                                options:(UIViewAnimationOptionCurveEaseIn)
                             animations:^(void){
                                 self.MenuStackView.alpha=0;
            self.MenuStackView.hidden = true;
            self.isMenuopen = false;
                                                }
                             completion:nil
                             ];
        
       /* [UIView transitionWithView:self.MenuStackView
                      duration:1.0
                      options:UIViewAnimationOptionTransitionCurlUp
                      animations:^{
            self.MenuStackView.hidden = true;
            self.isMenuopen = false;
            
                      } completion:nil
      ];*/
        
    }else{
                
       /* [UIView transitionWithView:self.MenuStackView
                      duration:0.5
                      options:UIViewAnimationOptionTransitionCurlDown
                      animations:^{
                         self.MenuStackView.hidden = false;
                         self.isMenuopen = true;

                      } completion:nil
      ]; */
        self.MenuStackView.alpha = 0;
        self.MenuStackView.hidden = false;
        [UIView animateWithDuration:0.7
                                  delay:0
                                options:(UIViewAnimationOptionCurveEaseIn)
                             animations:^(void){
            
                                 self.MenuStackView.alpha=1;
                                 self.isMenuopen = true;
            
                                //self.menucloseButton.imageView.layer.cornerRadius = 7.0f;
                                    self.menucloseButton.layer.shadowRadius = 3.0f;
                                    self.menucloseButton.layer.shadowColor = [UIColor blackColor].CGColor;
                                    self.menucloseButton.layer.shadowOffset = CGSizeMake(0.0f, 1.0f);
                                    self.menucloseButton.layer.shadowOpacity = 0.5f;
                                    self.menucloseButton.layer.masksToBounds = NO;
                            }
                             completion:nil
                             ];

        
    }
    
}
    
- (IBAction)micButtonPressed:(id)sender {
    // We will toggle the mic to mute/unmute and change the title according to the user action.
    

    
    if (self.localAudioTrack) {
        self.localAudioTrack.enabled = !self.localAudioTrack.isEnabled;
        // If audio not enabled, mic is muted and button crossed out
        [self.micButton setSelected: !self.localAudioTrack.isEnabled];
        
        if(self.micButton.selected){
        
          //  self.micButton.backgroundColor = [UIColor colorWithRed: 0.94 green: 0.93 blue: 0.93 alpha: 1.00];

        }else{
           
          //  self.micButton.backgroundColor = [UIColor colorWithRed: 0.29 green: 0.49 blue: 0.71 alpha: 1.00];
        }
    }
}

- (IBAction)cameraSwitchButtonPressed:(id)sender {
    [self flipCamera];
}

- (IBAction)videoButtonPressed:(id)sender {
    if(self.localVideoTrack){
        self.localVideoTrack.enabled = !self.localVideoTrack.isEnabled;
        [self.videoButton setSelected: !self.localVideoTrack.isEnabled];
        
        if(self.videoButton.selected){
        
          //  self.videoButton.backgroundColor = [UIColor colorWithRed: 0.94 green: 0.93 blue: 0.93 alpha: 1.00];

        }else{
            AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
            NSError *error = nil;
             if ([device lockForConfiguration:&error])
             {
                device.videoZoomFactor = 1.0;
                [device unlockForConfiguration];
             }
            else
            {
              NSLog(@"error: %@", error);
            }
                
        //    self.videoButton.backgroundColor = [UIColor colorWithRed: 0.29 green: 0.49 blue: 0.71 alpha: 1.00];
        }
    }
}

#pragma mark - Private

- (BOOL)isSimulator {
#if TARGET_IPHONE_SIMULATOR
    return YES;
#endif
    return NO;
}

- (void)startPreview {
    // TVICameraCapturer is not supported with the Simulator.
    
    NSLog(@"preview::: %@%@%@",[self.config schemacolor],[self.config lat],[self.config roomownerid]);
    
    if ([self isSimulator]) {
        [self.previewView removeFromSuperview];
        return;
    }
    TVIVideoView *localView = [[TVIVideoView alloc] init];
    self.previewView = localView;
    //self.previewView.autoresizingMask = UIViewAutoresizingFlexibleWidth| UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;
    
    localView.contentMode = UIViewContentModeScaleAspectFill;
    self.isSwitchWindow = FALSE;
    
   // [self.view addSubview:];
    AVCaptureDevice *frontCamera = [TVICameraSource captureDeviceForPosition:AVCaptureDevicePositionFront];
    AVCaptureDevice *backCamera = [TVICameraSource captureDeviceForPosition:AVCaptureDevicePositionBack];
    
    if (frontCamera != nil || backCamera != nil) {
        self.camera = [[TVICameraSource alloc] initWithDelegate:self];
        
        self.localVideoTrack = [TVILocalVideoTrack trackWithSource:self.camera
                                                             enabled:YES
                                                                name:@"Camera"];
        
        
        if (!self.localVideoTrack) {
            [self logMessage:@"Failed to add video track"];
        } else {
            // Add renderer to video track for local preview
            [self.localVideoTrack addRenderer:self.previewView];
            
            [self logMessage:@"Video track created"];
            
            if (frontCamera != nil && backCamera != nil) {
               // UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self
               // action:@selector(switchWidow)];
              //  [self.previewView addGestureRecognizer:tap];
                self.cameraSwitchButton.hidden = NO;
            }
            
            self.videoButton.hidden = NO;
            
            AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
            if(frontCamera != nil){
                self.isFlashON = false;
                if ([device hasTorch]) {
                     self.flashbutton.hidden = YES;
                }
            }else{
               
               if ([device hasTorch]) {
                    self.isFlashON = true;
                    self.flashbutton.hidden = NO;
               }
            }
            
            
            [self.camera startCaptureWithDevice:frontCamera != nil ? frontCamera : backCamera
                 completion:^(AVCaptureDevice *device, TVIVideoFormat *format, NSError *error) {
                     if (error != nil) {
                         [self logMessage:[NSString stringWithFormat:@"Start capture failed with error.\ncode = %lu error = %@", error.code, error.localizedDescription]];
                     } else {
                         self.previewView.mirror = (device.position == AVCaptureDevicePositionFront);
                     }
            }];
            
            [self.view insertSubview:self.previewView atIndex:0];

        }
    } else {
       [self logMessage:@"No front or back capture device found!"];
   }
    
    NSLayoutConstraint *centerX = [NSLayoutConstraint constraintWithItem:self.previewView
                                                               attribute:NSLayoutAttributeCenterX
                                                               relatedBy:NSLayoutRelationEqual
                                                                  toItem:self.view
                                                               attribute:NSLayoutAttributeCenterX
                                                              multiplier:1
                                                                constant:0];
    [self.view addConstraint:centerX];
    NSLayoutConstraint *centerY = [NSLayoutConstraint constraintWithItem:self.previewView
                                                               attribute:NSLayoutAttributeCenterY
                                                               relatedBy:NSLayoutRelationEqual
                                                                  toItem:self.view
                                                               attribute:NSLayoutAttributeCenterY
                                                              multiplier:1
                                                                constant:0];
    [self.view addConstraint:centerY];
    NSLayoutConstraint *width = [NSLayoutConstraint constraintWithItem:self.previewView
                                                             attribute:NSLayoutAttributeWidth
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:self.view
                                                             attribute:NSLayoutAttributeWidth
                                                            multiplier:1
                                                              constant:0];
    [self.view addConstraint:width];
    NSLayoutConstraint *height = [NSLayoutConstraint constraintWithItem:self.previewView
                                                              attribute:NSLayoutAttributeHeight
                                                              relatedBy:NSLayoutRelationEqual
                                                                 toItem:self.view
                                                              attribute:NSLayoutAttributeHeight
                                                             multiplier:1
                                                               constant:0];
    [self.view addConstraint:height];
    
    self.previewView.delegate = self;
    [self.previewView addGestureRecognizer:[[UIPinchGestureRecognizer alloc] initWithTarget:self
                                                                              action:@selector(didPinch:)]];


    //Added image for local view
    
    //UIGraphicsBeginImageContext(self.view.frame.size);
   // [[UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"] drawInRect:CGRectMake(0,0,)];
   // UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
   
  //  UIGraphicsEndImageContext();
    //self.previewView.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"]];
   // self.previewView.backgroundColor = [UIColor colorWithPatternImage:image];
    
    
   /* UIImage *backgroundImage = [UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"];

    UIGraphicsBeginImageContext(self.view.bounds.size);

    CGRect imagePosition = CGRectMake((self.view.bounds.size.width / 2)  - (backgroundImage.size.width / 2),
                                      (self.view.bounds.size.height / 2) - (backgroundImage.size.height / 2),
                                      backgroundImage.size.width,
                                      backgroundImage.size.height);

    [backgroundImage drawInRect:imagePosition];
    UIImage *image1 = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();

    self.view.backgroundColor = [UIColor colorWithPatternImage:image1];*/

   // UIImageView *background = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"]];
   // [self.view addSubview:background];
   

   // UIImageView *imageview = [[UIImageView alloc]
   // initWithFrame:CGRectMake(50, 50, sizeBeingScaledTo.width,sizeBeingScaledTo.height)];
   // [imageview setImage:[UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"]];
   // [imageview setContentMode:UIViewContentModeScaleAspectFit];
   // [self.view insertSubview:imageview atIndex:1];
   // self.view.backgroundColor = imageview;

   // [self.view addSubview:imageview];
   
    CGSize sizeBeingScaledTo = CGSizeAspectFit([UIImage                                     imageNamed:@"ExAM_RV-MG-Paused2.png"].size, self.view.frame.size, self.view.bounds);
    
    UIGraphicsBeginImageContext(self.view.frame.size);
       [[UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"] drawInRect:CGRectMake((self.view.frame.size.width / 2)  - (sizeBeingScaledTo.width / 2),
                                                                             (self.view.frame.size.height / 2) - (sizeBeingScaledTo.height / 2),sizeBeingScaledTo.width,sizeBeingScaledTo.height)];
       UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
      
       UIGraphicsEndImageContext();
       
      // self.previewView.backgroundColor = [UIColor colorWithPatternImage:image];
    
    
  
 
}
- (void)didPinch:(UIPinchGestureRecognizer *)sender {
   /* CGPoint location = [pinch locationInView:self.view];
     UIView *pinchView = pinch.view;
       CGRect bounds = pinchView.bounds;
       CGPoint pinchCenter = [pinch locationInView:pinchView];
       pinchCenter.x -= CGRectGetMidX(bounds);
       pinchCenter.y -= CGRectGetMidY(bounds);
       CGAffineTransform transform = pinchView.transform;
       transform = CGAffineTransformTranslate(transform, pinchCenter.x, pinchCenter.y);
       CGFloat scale = pinch.scale;
       transform = CGAffineTransformScale(transform, scale, scale);
       transform = CGAffineTransformTranslate(transform, -pinchCenter.x, -pinchCenter.y);
       pinchView.transform = transform;
       pinch.scale = 1.0;*/
    AVCaptureDevice *device =[AVCaptureDevice defaultDeviceWithMediaType:
                                                      AVMediaTypeVideo];
    AVCaptureDeviceFormat *format = device.activeFormat;
    CGFloat maxZoomFactor = format.videoMaxZoomFactor;
    NSArray *formats = device.formats;
    const CGFloat pinchVelocityDividerFactor = 10.1;
    if (sender.state == UIGestureRecognizerStateChanged )
    {
       NSError *error = nil;
       if ([device lockForConfiguration:&error])
       {
          CGFloat desiredZoomFactor = device.videoZoomFactor +
          atan2f(sender.velocity, pinchVelocityDividerFactor);

           if (self.camera.device.position == AVCaptureDevicePositionBack && !self.isSwitchWindow) {
              // self.camera.zoomFactor =   MAX(1.0, MIN(desiredZoomFactor,
            //   device.activeFormat.videoMaxZoomFactor));
               
               NSLog(@":::::zoom::::::%.20f", MAX(1.0, MIN(desiredZoomFactor,
               device.activeFormat.videoMaxZoomFactor)));
               device.videoZoomFactor =   MAX(1.0, MIN(desiredZoomFactor,
                                     device.activeFormat.videoMaxZoomFactor));
           }
         
          [device unlockForConfiguration];
       }
      else
      {
        NSLog(@"error: %@", error);
      }
    }
   // User tapped at the point above. Do something with that if you want.
}

CGSize CGSizeAspectFit(const CGSize aspectRatio, const CGSize boundingSize, CGRect view)
{
   if (CGRectGetWidth(view) > CGRectGetHeight(view)) {
       //landscape
       CGSize aspectFitSize = CGSizeMake((boundingSize.width/10)*6, (boundingSize.height/10)*6);
       float mW = (boundingSize.width/10)*6 / aspectRatio.width;
       float mH =(boundingSize.height/10)*6 / aspectRatio.height;
       if( mH < mW )
           aspectFitSize.width = mH * aspectRatio.width;
       else if( mW < mH )
           aspectFitSize.height = mW * aspectRatio.height;
       return aspectFitSize;
   }else{
       CGSize aspectFitSize = CGSizeMake((boundingSize.width/10)*6, boundingSize.height);
       float mW = (boundingSize.width/10)*6 / aspectRatio.width;
       float mH = boundingSize.height / aspectRatio.height;
       if( mH < mW )
           aspectFitSize.width = mH * aspectRatio.width;
       else if( mW < mH )
           aspectFitSize.height = mW * aspectRatio.height;
       return aspectFitSize;
   }
    
}
//try this AnimationTransitionCurlDown \UP

-(void)pageDown
{
    [UIView transitionWithView:!self.isSwitchWindow ? self.previewView : (self.remoteView ? self.remoteView: self.previewView)
                  duration:1.0
                  options:UIViewAnimationOptionTransitionFlipFromLeft
                  animations:^{
                     // self.mapView.hidden   = !showingMapView;
                     // self.tableView.hidden = showingMapView;
    //UIViewAnimationOptionTransitionCurlUp
                  } completion:nil
 ];
    
}

-(void)pageUP
{
[UIView transitionWithView:self.previewView
                  duration:1.0
                  options:UIViewAnimationOptionTransitionFlipFromBottom
                  animations:^{
                     // self.mapView.hidden   = !showingMapView;
                     // self.tableView.hidden = showingMapView;
    //UIViewAnimationOptionTransitionCurlUp
                  } completion:nil
 ];
    
    if(self.remoteView){
        
        [UIView transitionWithView:self.remoteView
                         duration:1.0
                         options:UIViewAnimationOptionTransitionFlipFromBottom
                         animations:^{
                            // self.mapView.hidden   = !showingMapView;
                            // self.tableView.hidden = showingMapView;
           //UIViewAnimationOptionTransitionCurlUp
                         } completion:nil
        ];
    }
    
}

//flip uiviews  using animation

- (void)switchWidow {
    
    [self pageUP];
   // [self FlipFromLeft];
  //  [self FlipFromRight];
   // [self pageDown];
    
    dispatch_time_t delay = dispatch_time(DISPATCH_TIME_NOW, NSEC_PER_SEC * 0.3);
    dispatch_after(delay, dispatch_get_main_queue(), ^(void){
        
    
    
    if(self.isSwitchWindow){
        
        // Here local is full view and remote view is in window view.
        self.isSwitchWindow = FALSE;
        // It change the action click logic
        [self.remoteView addGestureRecognizer:self.remoteActionTap];
        [self.previewView removeGestureRecognizer:self.localActionTap];
        //[self.remoteView removeFromSuperview];
        NSLog(@":::::if::::");

        if (self.remoteParticipant) {
            if ([self.remoteParticipant.videoTracks count] > 0) {
                // To fix app creah without enable video
                TVIRemoteVideoTrack *videoTrack = self.remoteParticipant.remoteVideoTracks[0].remoteTrack;
                if(self.remoteParticipant.remoteVideoTracks[0].isTrackEnabled){
                    [videoTrack addRenderer:self.remoteView];
                }
                NSLog(@"remote::::%@%@",self.remoteParticipant,self.remoteParticipant.remoteVideoTracks[0]);
                
                [videoTrack removeRenderer:self.previewView];
            }
        }
        if([self.localVideoTrack.renderers count ] > 0){
            [self.localVideoTrack removeRenderer:self.remoteView];
            [self.localVideoTrack addRenderer:self.previewView];
        }else{
            [self.localVideoTrack addRenderer:self.previewView];
        }
        
    }else{
        
        // Here remote view is full view and local view is in window view.
        
        self.isSwitchWindow = TRUE;
         // It change the action click logic
        [self.remoteView addGestureRecognizer:self.remoteActionTap];
        [self.previewView removeGestureRecognizer:self.localActionTap];

       // [self.previewView removeFromSuperview];
        NSLog(@":::::else::::");
        if (self.remoteParticipant) {
            
            if ([self.remoteParticipant.videoTracks count] > 0) {
                TVIRemoteVideoTrack *videoTrack = self.remoteParticipant.remoteVideoTracks[0].remoteTrack;
                
                // To fix app creah without enable video
                if(self.remoteParticipant.remoteVideoTracks[0].isTrackEnabled){
                  [videoTrack addRenderer:self.previewView];
                }
                [videoTrack removeRenderer:self.remoteView];
                
            }
        }
        
        if([self.localVideoTrack.renderers count ] > 0){
            [self.localVideoTrack removeRenderer:self.previewView];
            [self.localVideoTrack addRenderer:self.remoteView];
        }else{
            [self.localVideoTrack addRenderer:self.remoteView];
        }
    }
    
  });

}

- (void)flipCamera {
    AVCaptureDevice *newDevice = nil;
    
    [self pageDown];
    
    if (self.camera.device.position == AVCaptureDevicePositionFront) {
        newDevice = [TVICameraSource captureDeviceForPosition:AVCaptureDevicePositionBack];
        
        AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
       if ([device hasTorch]) {
           self.flashbutton.hidden = NO;
           self.isFlashON = false;
           [self.flashbutton setSelected: self.isFlashON];

        }
        
    } else {
        newDevice = [TVICameraSource captureDeviceForPosition:AVCaptureDevicePositionFront];
        AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
        if ([device hasTorch]) {
            self.flashbutton.hidden = YES;
            self.isFlashON = false;
            [self.flashbutton setSelected: self.isFlashON];

         }
    }
    
    if (newDevice != nil) {
        [self.camera selectCaptureDevice:newDevice completion:^(AVCaptureDevice *device, TVIVideoFormat *format, NSError *error) {
            if (error != nil) {
                [self logMessage:[NSString stringWithFormat:@"Error selecting capture device.\ncode = %lu error = %@", error.code, error.localizedDescription]];
            } else {
                self.previewView.mirror = (device.position == AVCaptureDevicePositionFront);
            }
        }];
    }
}

- (void)prepareLocalMedia {
    
    // We will share local audio and video when we connect to room.
    
    // Create an audio track.
    if (!self.localAudioTrack) {
        self.localAudioTrack = [TVILocalAudioTrack trackWithOptions:nil
                                                            enabled:YES
                                                               name:@"Microphone"];
        
        if (!self.localAudioTrack) {
            [self logMessage:@"Failed to add audio track"];
        }
    }
    
    // Create a video track which captures from the camera.
    if (!self.localVideoTrack) {
        [self startPreview];
    }
    
    if(!self.localDataTrack){
          self.localDataTrack = [TVILocalDataTrack track];
        
        
    }

}

- (void)doConnect {
    if ([self.accessToken isEqualToString:@"TWILIO_ACCESS_TOKEN"]) {
        [self logMessage:@"Please provide a valid token to connect to a room"];
        return;
    }
    
    // Prepare local media which we will share with Room Participants.
    [self prepareLocalMedia];
    
    TVIConnectOptions *connectOptions = [TVIConnectOptions optionsWithToken:self.accessToken
                                                                      block:^(TVIConnectOptionsBuilder * _Nonnull builder) {
                                                                          builder.roomName = self.roomName;
                                                                          // Use the local media that we prepared earlier.
                                                                          builder.audioTracks = self.localAudioTrack ? @[ self.localAudioTrack ] : @[ ];
                                                                          builder.videoTracks = self.localVideoTrack ? @[ self.localVideoTrack ] : @[ ];
    
                                                                      }];
    
   
    // Connect to the Room using the options we provided.
    self.room = [TwilioVideoSDK connectWithOptions:connectOptions delegate:self];


    dispatch_async(dispatch_get_main_queue(), ^{

       
         self.roomNameLabel.text =[@"Room Name : " stringByAppendingString:self.room.name];
        self.roomNameLabel.frame = CGRectMake(self.HeaderBarView.frame.size.width-300,(self.HeaderBarView.frame.size.height/2)-25, 300, 50);
    });
       // [self.LoadingIndicatorView stopAnimating];

   // [self.LoadingIndicatorView removeFromSuperview];
    NSLog(@"room::::%@",self.room);
    [self logMessage:@"Attempting to connect to room"];
}

- (void)setupRemoteView {
    // Creating `TVIVideoView` programmatically
    TVIVideoView *remoteView = [[TVIVideoView alloc] init];
        NSLog(@"setupRemoteView called::::");
    // `TVIVideoView` supports UIViewContentModeScaleToFill, UIViewContentModeScaleAspectFill and UIViewContentModeScaleAspectFit
    // UIViewContentModeScaleAspectFit is the default mode when you create `TVIVideoView` programmatically.
    remoteView.contentMode = UIViewContentModeScaleAspectFill;
    

    if (CGRectGetWidth(self.view.bounds) > CGRectGetHeight(self.view.bounds)) {
      remoteView.frame = CGRectMake(self.view.frame.size.width-130,self.view.frame.size.height-250.0, 120,160);
               
        //Added for show background image;
           UIGraphicsBeginImageContext(remoteView.frame.size);
           [[UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"] drawInRect:remoteView.bounds];
           UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
           UIGraphicsEndImageContext();

          // remoteView.backgroundColor = [UIColor colorWithPatternImage:image];

    }else{
        remoteView.frame = CGRectMake(self.view.frame.size.width-130,self.view.frame.size.height-250.0, 120,160);
        
        //Added for show background image;
           UIGraphicsBeginImageContext(remoteView.frame.size);
           [[UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"] drawInRect:remoteView.bounds];
           UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
           UIGraphicsEndImageContext();

         //  remoteView.backgroundColor = [UIColor colorWithPatternImage:image];

    }
    self.remoteView = remoteView;
    [self.remoteView addGestureRecognizer:self.remoteActionTap];
    
    self.remoteView.layer.borderColor = [UIColor colorWithWhite:1.0f alpha:1.0f].CGColor;//[UIColor blackColor].CGColor;
    self.remoteView.layer.borderWidth = 1.0f;
    
    //[self.view addSubview:self.remoteView];
    
   
    if([self.room.localParticipant publishDataTrack:self.localDataTrack]){
        
        self.room.localParticipant.delegate = self;
    }else{
        NSLog(@"else::::");
    }

    
}

//Added to create room instant ,when enable video
- (void)setupRemoteViewFromVideo {
    // Creating `TVIVideoView` programmatically
    TVIVideoView *remoteView = [[TVIVideoView alloc] init];
        
    // `TVIVideoView` supports UIViewContentModeScaleToFill, UIViewContentModeScaleAspectFill and UIViewContentModeScaleAspectFit
    // UIViewContentModeScaleAspectFit is the default mode when you create `TVIVideoView` programmatically.
    remoteView.contentMode = UIViewContentModeScaleAspectFill;
    

    if (CGRectGetWidth(self.view.bounds) > CGRectGetHeight(self.view.bounds)) {
      remoteView.frame = CGRectMake(self.view.frame.size.width-130,self.view.frame.size.height-250.0, 120,160);
               
        //Added for show background image;
           UIGraphicsBeginImageContext(remoteView.frame.size);
           [[UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"] drawInRect:remoteView.bounds];
           UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
           UIGraphicsEndImageContext();

          // remoteView.backgroundColor = [UIColor colorWithPatternImage:image];

    }else{
        remoteView.frame = CGRectMake(self.view.frame.size.width-130,self.view.frame.size.height-250.0, 120,160);
        
        //Added for show background image;
           UIGraphicsBeginImageContext(remoteView.frame.size);
           [[UIImage imageNamed:@"ExAM_RV-MG-Paused2.png"] drawInRect:remoteView.bounds];
           UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
           UIGraphicsEndImageContext();

         //  remoteView.backgroundColor = [UIColor colorWithPatternImage:image];

    }
    self.remoteView = remoteView;
    [self.remoteView addGestureRecognizer:self.remoteActionTap];
    
    self.remoteView.layer.borderColor = [UIColor colorWithWhite:1.0f alpha:1.0f].CGColor;//[UIColor blackColor].CGColor;
    self.remoteView.layer.borderWidth = 1.0f;
    
    [self.view addSubview:self.remoteView];
    
}
//end

// Reset the client ui status
- (void)showRoomUI:(BOOL)inRoom {
    self.micButton.hidden = !inRoom;
    [UIApplication sharedApplication].idleTimerDisabled = inRoom;
}

- (void)cleanupRemoteParticipant {
    
    if (self.remoteParticipant) {
        if ([self.remoteParticipant.videoTracks count] > 0) {
            TVIRemoteVideoTrack *videoTrack = self.remoteParticipant.remoteVideoTracks[0].remoteTrack;
            [videoTrack removeRenderer:self.remoteView];
            [self.remoteView removeFromSuperview];
        }
        self.remoteParticipant = nil;
    }
}

- (void)logMessage:(NSString *)msg {
    NSLog(@"%@", msg);
}

- (void)handleConnectionError: (NSString*)message {
    if ([self.config handleErrorInApp]) {
        [self logMessage: @"Error handling disabled for the plugin. This error should be handled in the hybrid app"];
        [self dismiss];
        return;
    }
    [self logMessage: @"Connection error handled by the plugin"];
    UIAlertController * alert = [UIAlertController
                                 alertControllerWithTitle:NULL
                                 message: message
                                 preferredStyle:UIAlertControllerStyleAlert];

    NSMutableAttributedString *titleTxt = [[NSMutableAttributedString alloc] initWithString:message];

    [titleTxt addAttribute:NSFontAttributeName
                  value:[UIFont systemFontOfSize:22.0]
                  range:NSMakeRange(0, titleTxt.length)];
    [alert setValue:titleTxt forKey:@"attributedMessage"];

    //Add Buttons
    NSLog(@"ssss--%@%@",[self.config i18nAccept], message);
    UIAlertAction* yesButton = [UIAlertAction
                                actionWithTitle:@"OK" //[self.config i18nAccept]
                                style:UIAlertActionStyleDefault
                                handler: ^(UIAlertAction * action) {
                                    [self dismiss];
                                }];
    
    [alert addAction:yesButton];
    [self presentViewController:alert animated:YES completion:nil];
}

- (void) dismiss {
    [[TwilioVideoManager getInstance] publishEvent: CLOSED];
    [self dismissViewControllerAnimated:NO completion:nil];
}

#pragma mark TVILocalParticipantDelegate


- (void)localParticipant:(nonnull TVILocalParticipant *)participant didPublishDataTrack:(nonnull TVILocalDataTrackPublication *)dataTrackPublication
{
    NSLog(@"local track :::::::::::::%@",dataTrackPublication);
    NSString* str = [self.config lat];
    NSData* data = [str dataUsingEncoding:NSUTF8StringEncoding];
    [self.localDataTrack sendString:str];

}

- (void)localParticipant:(nonnull TVILocalParticipant *)participant
didFailToPublishDataTrack:(nonnull TVILocalDataTrack *)dataTrack
               withError:(nonnull NSError *)error{
    NSLog(@"local track ::::::::error:::::%@",error);
    
}

#pragma mark - TwilioVideoActionProducerDelegate

- (void)onDisconnect {
    if (self.room != NULL) {
        [self.room disconnect];
    }
}

#pragma mark - TVIRoomDelegate


- (void)didConnectToRoom:(nonnull TVIRoom *)room {
    // At the moment, this example only supports rendering one Participant at a time.
    [self logMessage:[NSString stringWithFormat:@"Connected to room %@ as %@", room.name, room.localParticipant.identity]];
    [[TwilioVideoManager getInstance] publishEvent: CONNECTED];
    
    if (room.remoteParticipants.count > 0) {
        
        //Added for filter room owner.
        for (int i = 0 ; i < room.remoteParticipants.count; i++)
        {
            NSLog(@"---inside room id --%@",[self.config roomownerid]);
            NSLog(@"---inside participant id --%@",room.remoteParticipants[i].sid);

            if ([[self.config roomownerid] isEqualToString:room.remoteParticipants[i].sid]) {
                NSLog(@"The name string holds the text Programming Language");
                self.remoteParticipant = room.remoteParticipants[i];
               self.remoteParticipant.delegate = self;
               NSLog(@"---inside--%@",self.remoteParticipant);
            }else{
                NSLog(@"outter");

            }
        }
        
    }
}

- (void)room:(nonnull TVIRoom *)room didFailToConnectWithError:(nonnull NSError *)error {
    [self logMessage:[NSString stringWithFormat:@"Failed to connect to room, error = %@", error]];
    [[TwilioVideoManager getInstance] publishEvent: CONNECT_FAILURE with:[TwilioVideoUtils convertErrorToDictionary:error]];
    
    self.room = nil;
    
    [self showRoomUI:NO];
    if (error.code == 53205) {
        [self handleConnectionError:@"Username already exists"];

    }else{
        [self handleConnectionError:@"Room connection lost"];
    }
    //[self handleConnectionError:error.localizedDescription];
   // [self handleConnectionError: [self.config i18nConnectionError]];
}

- (void)room:(nonnull TVIRoom *)room didDisconnectWithError:(nullable NSError *)error {
    [self logMessage:[NSString stringWithFormat:@"Disconnected from room %@, error = %@", room.name, error]];
    
    [self cleanupRemoteParticipant];
    self.room = nil;
    
    [self showRoomUI:NO];
    if (error != NULL) {
        [[TwilioVideoManager getInstance] publishEvent:DISCONNECTED_WITH_ERROR with:[TwilioVideoUtils convertErrorToDictionary:error]];
        if (error.code == 53205) {
            [self handleConnectionError:@"Username already exists"];

        }else{
            [self handleConnectionError:@"Room connection lost"];
        }
        //[self handleConnectionError: [self.config i18nDisconnectedWithError]];
    } else {
        [[TwilioVideoManager getInstance] publishEvent: DISCONNECTED];
        [self dismiss];
    }
}

- (void)room:(nonnull TVIRoom *)room isReconnectingWithError:(nonnull NSError *)error {
    [[TwilioVideoManager getInstance] publishEvent: RECONNECTING with:[TwilioVideoUtils convertErrorToDictionary:error]];
}

- (void)didReconnectToRoom:(nonnull TVIRoom *)room {
    [[TwilioVideoManager getInstance] publishEvent: RECONNECTED];
}

- (void)room:(nonnull TVIRoom *)room participantDidConnect:(nonnull TVIRemoteParticipant *)participant {
    NSLog(@"-----%@",participant.identity);
    
    if (!self.remoteParticipant) {
        
        //added for roomowner filter
        if ([[self.config roomownerid] isEqualToString:participant.sid]) {
            self.remoteParticipant = participant;
            self.remoteParticipant.delegate = self;
        }
        
    }
    [self logMessage:[NSString stringWithFormat:@"Participant %@ connected with %lu audio and %lu video tracks",
                      participant.identity,
                      (unsigned long)[participant.audioTracks count],
                      (unsigned long)[participant.videoTracks count]]];
    [[TwilioVideoManager getInstance] publishEvent: PARTICIPANT_CONNECTED];
}

- (void)room:(nonnull TVIRoom *)room participantDidDisconnect:(nonnull TVIRemoteParticipant *)participant {
    if (self.remoteParticipant == participant) {
        
        // Added custom logic to remove particular participant on participantdisconnect
    
       // [self cleanupRemoteParticipant]; // It will remove all
        
        if (self.remoteParticipant) {
            if ([self.remoteParticipant.videoTracks count] > 0) {
                TVIRemoteVideoTrack *videoTrack = self.remoteParticipant.remoteVideoTracks[0].remoteTrack;
                [videoTrack removeRenderer:self.remoteView];
                [self.remoteView removeFromSuperview];

            }
            self.remoteParticipant = nil;
            //added for remove all, if room owner left from meeting
            self.room = nil;
            [self showRoomUI:NO];
            [[TwilioVideoManager getInstance] publishEvent: DISCONNECTED];
            [self handleConnectionError:@"The room has been closed by the organizer"];
           // [self dismiss];

            
        }
        
    }
    [self logMessage:[NSString stringWithFormat:@"Room %@ participant %@ disconnected", room.name, participant.identity]];
    [[TwilioVideoManager getInstance] publishEvent: PARTICIPANT_DISCONNECTED];
}


#pragma mark - TVIRemoteParticipantDelegate

- (void)remoteParticipant:(nonnull TVIRemoteParticipant *)participant didPublishVideoTrack:(nonnull TVIRemoteVideoTrackPublication *)publication {

    // Remote Participant has offered to share the video Track.
    
    [self logMessage:[NSString stringWithFormat:@"Participant %@ published %@ video track .",
                      participant.identity, publication.trackName]];
}

- (void)remoteParticipant:(nonnull TVIRemoteParticipant *)participant didUnpublishVideoTrack:(nonnull TVIRemoteVideoTrackPublication *)publication {

    // Remote Participant has stopped sharing the video Track.
    
    [self logMessage:[NSString stringWithFormat:@"Participant %@ unpublished %@ video track.",
                      participant.identity, publication.trackName]];
}

- (void)remoteParticipant:(nonnull TVIRemoteParticipant *)participant didPublishAudioTrack:(nonnull TVIRemoteAudioTrackPublication *)publication {

    // Remote Participant has offered to share the audio Track.
    
    [self logMessage:[NSString stringWithFormat:@"Participant %@ published %@ audio track.",
                      participant.identity, publication.trackName]];
}

- (void)remoteParticipant:(nonnull TVIRemoteParticipant *)participant didUnpublishAudioTrack:(nonnull TVIRemoteAudioTrackPublication *)publication {

    // Remote Participant has stopped sharing the audio Track.
    
    [self logMessage:[NSString stringWithFormat:@"Participant %@ unpublished %@ audio track.",
                      participant.identity, publication.trackName]];
}

- (void)didSubscribeToVideoTrack:(nonnull TVIRemoteVideoTrack *)videoTrack
                     publication:(nonnull TVIRemoteVideoTrackPublication *)publication
                  forParticipant:(nonnull TVIRemoteParticipant *)participant {
    // We are subscribed to the remote Participant's audio Track. We will start receiving the
    // remote Participant's video frames now.
    
    [self logMessage:[NSString stringWithFormat:@"Subscribed to %@ video track for Participant %@",
                      publication.trackName, participant.identity]];
    [[TwilioVideoManager getInstance] publishEvent: VIDEO_TRACK_ADDED];

    NSLog(@";;;lat log id %@%@%@",[self.config log],[self.config lat],[self.config roomownerid]);

    if (self.remoteParticipant == participant) {
        
        if(self.remoteParticipant.remoteVideoTracks[0].isTrackEnabled){
           [self setupRemoteViewFromVideo];
        }else{
           [self setupRemoteView];
        }
       
        
        if(self.isSwitchWindow){
            if(self.remoteParticipant.remoteVideoTracks[0].isTrackEnabled){
              [videoTrack addRenderer:self.previewView];
            }
        }else{
            if(self.remoteView){
                if(self.remoteParticipant.remoteVideoTracks[0].isTrackEnabled){
                  [videoTrack addRenderer:self.remoteView];
                }
                
            }
          
        }
        //[videoTrack addRenderer:self.remoteView];
    }
}

- (void)didUnsubscribeFromVideoTrack:(nonnull TVIRemoteVideoTrack *)videoTrack
                         publication:(nonnull TVIRemoteVideoTrackPublication *)publication
                      forParticipant:(nonnull TVIRemoteParticipant *)participant {

    // We are unsubscribed from the remote Participant's video Track. We will no longer receive the
    // remote Participant's video.
    
    [self logMessage:[NSString stringWithFormat:@"Unsubscribed from %@ video track for Participant %@",
                      publication.trackName, participant.identity]];
    [[TwilioVideoManager getInstance] publishEvent: VIDEO_TRACK_REMOVED];
    
    if (self.remoteParticipant == participant) {
        
        if(self.remoteView){
            [videoTrack removeRenderer:self.remoteView];
        }
        
        //[self.remoteView removeFromSuperview]; // temprary comment
    }
}

- (void)didSubscribeToAudioTrack:(nonnull TVIRemoteAudioTrack *)audioTrack
                     publication:(nonnull TVIRemoteAudioTrackPublication *)publication
                  forParticipant:(nonnull TVIRemoteParticipant *)participant {

    // We are subscribed to the remote Participant's audio Track. We will start receiving the
    // remote Participant's audio now.
    
    [self logMessage:[NSString stringWithFormat:@"Subscribed to %@ audio track for Participant %@",
                      publication.trackName, participant.identity]];
    [[TwilioVideoManager getInstance] publishEvent: AUDIO_TRACK_ADDED];
}

- (void)didUnsubscribeFromAudioTrack:(nonnull TVIRemoteAudioTrack *)audioTrack
                         publication:(nonnull TVIRemoteAudioTrackPublication *)publication
                      forParticipant:(nonnull TVIRemoteParticipant *)participant {

    // We are unsubscribed from the remote Participant's audio Track. We will no longer receive the
    // remote Participant's audio.
    
    [self logMessage:[NSString stringWithFormat:@"Unsubscribed from %@ audio track for Participant %@",
                      publication.trackName, participant.identity]];
    [[TwilioVideoManager getInstance] publishEvent: AUDIO_TRACK_REMOVED];
}

- (void)remoteParticipant:(nonnull TVIRemoteParticipant *)participant didEnableVideoTrack:(nonnull TVIRemoteVideoTrackPublication *)publication {
    [self logMessage:[NSString stringWithFormat:@"Participant %@ enabled %@ video track.",
                      participant.identity, publication.trackName]];

    //added for show video on pause.
   if (self.remoteParticipant == participant) {
       NSLog(@"dsfsdfsdf inside%@",self.remoteParticipant);
      TVIRemoteVideoTrack *videoTrack = self.remoteParticipant.remoteVideoTracks[0].remoteTrack;
         
      [self setupRemoteViewFromVideo];
       NSLog(@"dsfsdfsdf inside%d",self.isSwitchWindow);

      if(self.isSwitchWindow){
          if(self.remoteParticipant.remoteVideoTracks[0].isTrackEnabled){
            [videoTrack addRenderer:self.previewView];
          }
      }else{
          NSLog(@"self.remoteView inside%@",self.remoteView);
          if(self.remoteView){
              NSLog(@"self.remoteView 12312 inside%@",self.remoteView);
              if(self.remoteParticipant.remoteVideoTracks[0].isTrackEnabled){
                [videoTrack addRenderer:self.remoteView];
              }
              
          }
        
      }
    }
     //end
}

- (void)remoteParticipant:(nonnull TVIRemoteParticipant *)participant didDisableVideoTrack:(nonnull TVIRemoteVideoTrackPublication *)publication {
    [self logMessage:[NSString stringWithFormat:@"Participant %@ disabled %@ video track.",
                      participant.identity, publication.trackName]];
    
    //added for show video on pause.
    if (self.remoteParticipant == participant) {
      TVIRemoteVideoTrack *videoTrack = self.remoteParticipant.remoteVideoTracks[0].remoteTrack;
         
      if(self.isSwitchWindow){
          [videoTrack removeRenderer:self.previewView];
          
          if([self.localVideoTrack.renderers count ] > 0){
              [self.localVideoTrack removeRenderer:self.remoteView];
              [self.localVideoTrack addRenderer:self.previewView];
          }else{
              [self.localVideoTrack addRenderer:self.previewView];
          }
          self.isSwitchWindow = false;
      }else{
          if(self.remoteView){
              [videoTrack removeRenderer:self.remoteView];
          }
        
      }
        [self.remoteView removeFromSuperview];
        
    }
     //end
}

- (void)remoteParticipant:(nonnull TVIRemoteParticipant *)participant didEnableAudioTrack:(nonnull TVIRemoteAudioTrackPublication *)publication {
    [self logMessage:[NSString stringWithFormat:@"Participant %@ enabled %@ audio track.",
                      participant.identity, publication.trackName]];
}

- (void)remoteParticipant:(nonnull TVIRemoteParticipant *)participant didDisableAudioTrack:(nonnull TVIRemoteAudioTrackPublication *)publication {
    [self logMessage:[NSString stringWithFormat:@"Participant %@ disabled %@ audio track.",
                      participant.identity, publication.trackName]];
}

- (void)didFailToSubscribeToAudioTrack:(nonnull TVIRemoteAudioTrackPublication *)publication
                                 error:(nonnull NSError *)error
                        forParticipant:(nonnull TVIRemoteParticipant *)participant {
    [self logMessage:[NSString stringWithFormat:@"Participant %@ failed to subscribe to %@ audio track.",
                      participant.identity, publication.trackName]];
}

- (void)didFailToSubscribeToVideoTrack:(nonnull TVIRemoteVideoTrackPublication *)publication
                                 error:(nonnull NSError *)error
                        forParticipant:(nonnull TVIRemoteParticipant *)participant {
    [self logMessage:[NSString stringWithFormat:@"Participant %@ failed to subscribe to %@ video track.",
                      participant.identity, publication.trackName]];
}

#pragma mark - TVIVideoViewDelegate

- (void)videoView:(nonnull TVIVideoView *)view videoDimensionsDidChange:(CMVideoDimensions)dimensions {
    NSLog(@"Dimensions changed to: %d x %d", dimensions.width, dimensions.height);
    [self.view setNeedsLayout];
}

#pragma mark - TVICameraSourceDelegate

- (void)cameraSource:(nonnull TVICameraSource *)source didFailWithError:(nonnull NSError *)error {
    [self logMessage:[NSString stringWithFormat:@"Capture failed with error.\ncode = %lu error = %@", error.code, error.localizedDescription]];
}

@end
