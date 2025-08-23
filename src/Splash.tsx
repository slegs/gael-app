import React, {useCallback, useEffect} from 'react'
import {
  AccessibilityInfo,
  Image as RNImage,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native'
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Svg, {Path, SvgProps} from 'react-native-svg'
import {Image} from 'expo-image'
import * as SplashScreen from 'expo-splash-screen'

import {Logotype} from '#/view/icons/Logotype'
// @ts-ignore
import splashImagePointer from '../assets/splash.png'
// @ts-ignore
import darkSplashImagePointer from '../assets/splash-dark.png'
const splashImageUri = RNImage.resolveAssetSource(splashImagePointer).uri
const darkSplashImageUri = RNImage.resolveAssetSource(
  darkSplashImagePointer,
).uri

export const Logo = React.forwardRef(function LogoImpl(props: SvgProps, ref) {
  const width = 1000
  const height = width * (67 / 64)
  return (
    <Svg
      fill="none"
      // @ts-ignore it's fiiiiine
      ref={ref}
      viewBox="750 250 200 220"
      style={[{width, height}, props.style]}>
      <Path
        fill={props.fill || '#2ECC40'}
        d="M916.1851299183598 452.93434683254543L898.1511299183597 409.3483468325454A15.24 15.24 0 0 0 889.9211299183597 401.1183468325454L867.8741299183598 391.9743468325454L872.4461299183598 380.95134683254537A15.24 15.24 0 0 0 882.6061299183598 384.91334683254536H893.6301299183598A15.24 15.24 0 0 0 906.3301299183598 361.29134683254534L883.7741299183598 327.05234683254537A25.298 25.298 0 0 0 887.1781299183598 279.04634683254534A25.4 25.4 0 0 0 855.6821299183598 315.4703468325453L815.4991299183598 323.6483468325453A15.24 15.24 0 0 0 803.6121299183598 341.6323468325453Q804.5261299183597 346.1023468325453 807.7781299183598 349.3533468325453L815.5501299183597 357.1263468325453C818.2931299183598 359.9203468325453 821.9001299183598 361.34234683254533 825.5071299183597 361.54634683254534L819.0041299183598 377.29334683254535A25.4 25.4 0 0 0 821.1891299183598 400.7633468325453L805.8461299183598 423.72434683254545L765.7651299183598 431.70034683254545A15.24 15.24 0 0 0 771.7091299183597 461.57034683254545L817.9371299183598 452.42634683254545A15.24 15.24 0 0 0 827.5891299183597 445.92434683254544L847.2491299183597 416.46034683254544L872.3431299183598 426.8743468325454L887.9901299183597 464.56834683254544A15.24 15.24 0 0 0 916.1331299183597 452.8843468325454M840.0351299183598 352.96034683254544A15.26 15.26 0 1 1 868.2291299183597 364.64434683254547A15.26 15.26 0 0 1 840.0351299183598 352.96034683254544M898.6071299183598 370.69034683254546A5.08 5.08 0 0 1 893.6291299183598 374.75334683254545H882.6061299183598A5.08 5.08 0 0 1 882.6061299183598 364.5933468325454A5.08 5.08 0 0 0 887.6861299183598 359.51334683254544A5.08 5.08 0 0 0 883.3681299183598 354.53534683254543L885.4001299183598 349.7093468325454L885.8061299183597 348.5403468325454L897.8461299183598 366.82834683254544Q899.0141299183598 368.6583468325454 898.6081299183599 370.6893468325454M863.4041299183598 296.67434683254544A15.24 15.24 0 1 1 891.8111299183598 307.7233468325454A15.24 15.24 0 0 1 863.4041299183598 296.6733468325454M814.9401299183597 342.1903468325454A5.08 5.08 0 0 1 814.3301299183597 335.7903468325454A5.08 5.08 0 0 1 817.5311299183597 333.6053468325454L858.7301299183597 325.17234683254543Q863.4041299183598 324.20734683254545 867.7721299183597 325.9853468325454A15.24 15.24 0 0 1 876.0021299183597 345.8993468325454V345.9493468325454A25.248 25.248 0 0 0 839.2741299183598 338.3293468325454Q838.3591299183597 336.8563468325454 837.0891299183597 335.6373468325454A5.08 5.08 0 1 0 829.9261299183597 342.7493468325454A5.1 5.1 0 1 1 822.7131299183598 349.9633468325454ZM819.2581299183597 440.2343468325454A5.08 5.08 0 0 1 816.0081299183597 442.4193468325454L769.7791299183598 451.6143468325454A5.081 5.081 0 0 1 767.7471299183597 441.6573468325454L809.9111299183597 433.2753468325454A5.08 5.08 0 0 0 813.1111299183598 431.14134683254537L831.6551299183598 403.35434683254545A5.08 5.08 0 0 0 831.1971299183598 397.15634683254547C827.2351299183598 392.73634683254545 826.1171299183598 386.5903468325455 828.4031299183598 381.15434683254546L832.3151299183597 371.75634683254543A25.4 25.4 0 0 0 860.4581299183598 383.44034683254546L856.5461299183597 392.88934683254547A15.24 15.24 0 0 1 846.5381299183598 401.6263468325455A5.08 5.08 0 0 0 843.6421299183597 403.7093468325455ZM904.0941299183597 463.4503468325454A5.08 5.08 0 0 1 897.3891299183598 460.7073468325454L880.9801299183598 421.0323468325454A5.08 5.08 0 0 0 878.2371299183598 418.2893468325454L855.2761299183597 408.7893468325454Q860.2541299183598 405.8943468325454 863.5061299183598 401.1693468325454L886.0101299183598 410.51634683254537Q887.9401299183597 411.38034683254534 888.7531299183598 413.2603468325454L906.7871299183597 456.79534683254536A5.08 5.08 0 0 1 904.0441299183598 463.39934683254535"
      />
    </Svg>
  )
})

type Props = {
  isReady: boolean
}

export function Splash(props: React.PropsWithChildren<Props>) {
  'use no memo'
  const insets = useSafeAreaInsets()
  const intro = useSharedValue(0)
  const outroLogo = useSharedValue(0)
  const outroApp = useSharedValue(0)
  const outroAppOpacity = useSharedValue(0)
  const [isAnimationComplete, setIsAnimationComplete] = React.useState(false)
  const [isImageLoaded, setIsImageLoaded] = React.useState(false)
  const [isLayoutReady, setIsLayoutReady] = React.useState(false)
  const [reduceMotion, setReduceMotion] = React.useState<boolean | undefined>(
    false,
  )
  const isReady =
    props.isReady &&
    isImageLoaded &&
    isLayoutReady &&
    reduceMotion !== undefined

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  const logoAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(intro.get(), [0, 1], [0.8, 1], 'clamp'),
        },
        {
          scale: interpolate(
            outroLogo.get(),
            [0, 0.08, 1],
            [1, 0.8, 500],
            'clamp',
          ),
        },
      ],
      opacity: interpolate(intro.get(), [0, 1], [0, 1], 'clamp'),
    }
  })
  const bottomLogoAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(intro.get(), [0, 1], [0, 1], 'clamp'),
    }
  })
  const reducedLogoAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(intro.get(), [0, 1], [0.8, 1], 'clamp'),
        },
      ],
      opacity: interpolate(intro.get(), [0, 1], [0, 1], 'clamp'),
    }
  })

  const logoWrapperAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        outroAppOpacity.get(),
        [0, 0.1, 0.2, 1],
        [1, 1, 0, 0],
        'clamp',
      ),
    }
  })

  const appAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(outroApp.get(), [0, 1], [1.1, 1], 'clamp'),
        },
      ],
      opacity: interpolate(
        outroAppOpacity.get(),
        [0, 0.1, 0.2, 1],
        [0, 0, 1, 1],
        'clamp',
      ),
    }
  })

  const onFinish = useCallback(() => setIsAnimationComplete(true), [])
  const onLayout = useCallback(() => setIsLayoutReady(true), [])
  const onLoadEnd = useCallback(() => setIsImageLoaded(true), [])

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
        .then(() => {
          intro.set(() =>
            withTiming(
              1,
              {duration: 400, easing: Easing.out(Easing.cubic)},
              async () => {
                // set these values to check animation at specific point
                outroLogo.set(() =>
                  withTiming(
                    1,
                    {duration: 1200, easing: Easing.in(Easing.cubic)},
                    () => {
                      runOnJS(onFinish)()
                    },
                  ),
                )
                outroApp.set(() =>
                  withTiming(1, {
                    duration: 1200,
                    easing: Easing.inOut(Easing.cubic),
                  }),
                )
                outroAppOpacity.set(() =>
                  withTiming(1, {
                    duration: 1200,
                    easing: Easing.in(Easing.cubic),
                  }),
                )
              },
            ),
          )
        })
        .catch(() => {})
    }
  }, [onFinish, intro, outroLogo, outroApp, outroAppOpacity, isReady])

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion)
  }, [])

  const logoAnimations =
    reduceMotion === true ? reducedLogoAnimation : logoAnimation
  // special off-spec color for dark mode
  const logoBg = isDarkMode ? '#0F1824' : '#fff'

  return (
    <View style={{flex: 1}} onLayout={onLayout}>
      {!isAnimationComplete && (
        <View style={StyleSheet.absoluteFillObject}>
          <Image
            accessibilityIgnoresInvertColors
            onLoadEnd={onLoadEnd}
            source={{uri: isDarkMode ? darkSplashImageUri : splashImageUri}}
            style={StyleSheet.absoluteFillObject}
          />

          <Animated.View
            style={[
              bottomLogoAnimation,
              {
                position: 'absolute',
                bottom: insets.bottom + 40,
                left: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
              },
            ]}>
            <Logotype fill="#fff" width={90} />
          </Animated.View>
        </View>
      )}

      {isReady && (
        <>
          <Animated.View style={[{flex: 1}, appAnimation]}>
            {props.children}
          </Animated.View>

          {!isAnimationComplete && (
            <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                logoWrapperAnimation,
                {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{translateY: -(insets.top / 2)}, {scale: 0.1}], // scale from 1000px to 100px
                },
              ]}>
              <Animated.View style={[logoAnimations]}>
                <Logo fill={logoBg} />
              </Animated.View>
            </Animated.View>
          )}
        </>
      )}
    </View>
  )
}
