#import <Foundation/Foundation.h>

@interface TwilioVideoConfig : NSObject
@property NSString *primaryColorHex;
@property NSString *secondaryColorHex;
@property NSString *i18nConnectionError;
@property NSString *i18nDisconnectedWithError;
@property NSString *i18nAccept;
@property BOOL handleErrorInApp;
@property BOOL hangUpInApp;

//Added costom value
@property NSString *lat;
@property NSString *log;
@property NSString *roomownerid;
@property NSString *schemacolor;
@property NSString *headerBtnColor;
@property NSString *headerBtnTextColor;
@property NSString *headerValue;
@property NSString *appversion;

-(void) parse:(NSDictionary*)config;
+ (UIColor *)colorFromHexString:(NSString *)hexString;
@end
