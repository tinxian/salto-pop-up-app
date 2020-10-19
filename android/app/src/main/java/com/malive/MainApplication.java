package com.malive;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.proyecto26.inappbrowser.RNInAppBrowserPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.guichaguri.trackplayer.TrackPlayer;

import org.wonday.orientation.OrientationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import cl.json.RNSharePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.horcrux.svg.SvgPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.BuildConfig;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new RNInAppBrowserPackage(), new RNFirebasePackage(),
          new OrientationPackage(), new RNFirebaseAnalyticsPackage(), new TrackPlayer(), new VectorIconsPackage(),
          new RNSharePackage(), new ReactVideoPackage(), new RNGestureHandlerPackage(), new SvgPackage(),
          new ReactNativeConfigPackage(), new SplashScreenReactPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "artifacts/src/index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
