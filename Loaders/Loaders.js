import loaderStyle from './Loaders.module.css';

export const LoadingSkeletonLine = () => {
   return <div className={loaderStyle.LoadingSkeletonLine}></div>;
};

export const DualRingLoader = () => {
   return <div className={loaderStyle.LdsDualRing}></div>;
};

export const SmallDualRingLoader = () => {
   return <div className={loaderStyle.SmallerLdsDualRing}></div>;
};
