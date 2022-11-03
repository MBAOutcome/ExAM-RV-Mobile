#import "TwilioVideoConfig.h"

#define PRIMARY_COLOR_PROP                  @"primaryColor"
#define SECONDARY_COLOR_PROP                @"secondaryColor"
#define i18n_CONNECTION_ERROR_PROP          @"i18nConnectionError"
#define i18n_DISCONNECTED_WITH_ERROR_PROP   @"i18nDisconnectedWithError"
#define i18n_ACCEPT_PROP                    @"i18nAccept"
#define HANDLE_ERROR_IN_APP                 @"handleErrorInApp"
#define HANG_UP_IN_APP                      @"hangUpInApp"
//Added custom param in object
#define LAT @"lat"
#define LONG @"log"
#define ROOM_OWNER_Id @"roomownerid"

@implementation TwilioVideoConfig
-(void) parse:(NSDictionary*)config {
    NSLog(@"config:::%@",config);
    if (config == NULL || config == (id)[NSNull null]) { return; }
    self.primaryColorHex = [config objectForKey:PRIMARY_COLOR_PROP];
    self.secondaryColorHex = [config objectForKey:SECONDARY_COLOR_PROP];
    self.i18nConnectionError = [config objectForKey:i18n_CONNECTION_ERROR_PROP];
    if (self.i18nConnectionError == NULL) {
        self.i18nConnectionError = @"It was not possible to join the room";
    }
    self.i18nDisconnectedWithError = [config objectForKey:i18n_DISCONNECTED_WITH_ERROR_PROP];
    if (self.i18nDisconnectedWithError == NULL) {
        self.i18nDisconnectedWithError = @"Disconnected";
    }
    self.i18nAccept = [config objectForKey:i18n_ACCEPT_PROP];
    if (self.i18nAccept == NULL) {
        self.i18nAccept = @"Accept";
    }
    self.handleErrorInApp = FALSE;// [config objectForKey:HANDLE_ERROR_IN_APP];
    self.hangUpInApp = FALSE; //[config objectForKey:HANG_UP_IN_APP];
    
    //Added custom param to native side
    self.lat = [config objectForKey:LAT];
    self.log = [config objectForKey:LONG];
    self.roomownerid = [config objectForKey:ROOM_OWNER_Id];
    self.schemacolor = [config objectForKey:@"schemacolor"];
    self.headerBtnColor = [config objectForKey:@"headerBtnColor"];
    self.headerBtnTextColor = [config objectForKey:@"headerBtnTextColor"];
    self.headerValue = [config objectForKey:@"headerValue"];
    self.appversion = [config objectForKey:@"appversion"];

    
    
}

+ (UIColor *)colorFromHexString:(NSString *)hexString {
    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:hexString];
    [scanner setScanLocation:1]; // bypass '#' character
    [scanner scanHexInt:&rgbValue];
    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0 green:((rgbValue & 0xFF00) >> 8)/255.0 blue:(rgbValue & 0xFF)/255.0 alpha:1.0];
}
@end
