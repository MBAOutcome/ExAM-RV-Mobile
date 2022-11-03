@import TwilioVideo;
@import UIKit;
#import "TwilioVideoManager.h"
#import "TwilioVideoConfig.h"
#import "TwilioVideoPermissions.h"
#import "TwilioVideoUtils.h"

@interface TwilioVideoViewController: UIViewController <TVIRemoteParticipantDelegate, TVIRoomDelegate, TVIVideoViewDelegate, TVICameraSourceDelegate, TwilioVideoActionProducerDelegate, TVILocalParticipantDelegate>

// Configure access token manually for testing in `ViewDidLoad`, if desired! Create one manually in the console.
@property (nonatomic, strong) NSString *roomName;
@property (nonatomic, strong) NSString *accessToken;
@property (nonatomic, strong) TwilioVideoConfig *config;

#pragma mark Video SDK components

@property (nonatomic, strong) TVICameraSource *camera;
@property (nonatomic, strong) TVILocalVideoTrack *localVideoTrack;
@property (nonatomic, strong) TVILocalAudioTrack *localAudioTrack;
@property (nonatomic, strong) TVIRemoteParticipant *remoteParticipant;
@property (nonatomic, weak) TVIVideoView *remoteView;
@property (nonatomic, strong) TVIRoom *room;
//Added data track
@property (nonatomic,strong) TVILocalDataTrack *localDataTrack;
@property (nonatomic,strong) TVILocalDataTrackPublication * trackpulish;
#pragma mark UI Element Outlets and handles

@property (weak, nonatomic) IBOutlet UIView *statusbarView;
// `TVIVideoView` created from a storyboard
@property (weak, nonatomic) IBOutlet TVIVideoView *previewView;

@property (nonatomic, weak) IBOutlet UIButton *disconnectButton;
@property (nonatomic, weak) IBOutlet UIButton *micButton;
@property (nonatomic, weak) IBOutlet UILabel *roomLabel;
@property (nonatomic, weak) IBOutlet UILabel *roomLine;
@property (nonatomic, weak) IBOutlet UIButton *cameraSwitchButton;
@property (nonatomic, weak) IBOutlet UIButton *videoButton;
@property (weak, nonatomic) IBOutlet UIImageView *logo;
@property (weak, nonatomic) IBOutlet UIView *HeaderBarView;
- (void)connectToRoom:(NSString*)room token: (NSString *)token;
@property (weak, nonatomic) IBOutlet UIStackView *TittleView;
@property (weak, nonatomic) IBOutlet UIStackView *ControlButtonStackView;
@property (nonatomic, strong) IBOutlet UILabel *roomNameLabel;
@property (weak, nonatomic) IBOutlet UIStackView *LogoView;
@property (strong, nonatomic) UIActivityIndicatorView *LoadingIndicatorView;

@property (nonatomic, assign) BOOL isSwitchWindow;
@property (strong, nonatomic) UITapGestureRecognizer *remoteActionTap;
@property (strong, nonatomic) UITapGestureRecognizer *localActionTap;
@property (strong, nonatomic) UITapGestureRecognizer *aboutActionTap;
@property (strong, nonatomic) UITapGestureRecognizer *menuActionTap;


@property (nonatomic, weak) IBOutlet UIButton *flashbutton;
@property (strong, nonatomic) IBOutlet UIStackView *endcallstack;
@property (nonatomic, assign) BOOL isFlashON;
@property (nonatomic, weak) IBOutlet UIButton *menuButton;
@property (nonatomic, assign) BOOL isMenuopen;
@property (weak, nonatomic) IBOutlet UIStackView *MenuStackView;
@property (nonatomic, weak) IBOutlet UIButton *menucloseButton;

@property (weak, nonatomic) IBOutlet UILabel *Tittletext;
@property (weak, nonatomic) IBOutlet UIView *TittleContainerView;
@property (weak, nonatomic) IBOutlet UIImageView *imgVw;


@end
