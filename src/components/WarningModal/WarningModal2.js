// import React from 'react';
// import '../../../node_modules/gestalt/dist/gestalt.css';
// import { string, func, bool } from 'prop-types';
// import { Box, Button, Layer, Modal, Text } from 'gestalt';

// const WarningModal = ({
//   showWarningModal,
//   setShowWarningModal,
//   proceedFunction,
//   headingText,
//   buttonText,
//   subtext,
// }) => (
//   <Layer>
//     <Modal
//       accessibilityModalLabel={headingText}
//       heading={headingText}
//       onDismiss={() => {
//         setShowWarningModal(!showWarningModal);
//       }}
//       footer={
//         <Box
//           display="flex"
//           marginLeft={-1}
//           marginRight={-1}
//           justifyContent="center"
//         >
//           <Box padding={1}>
//             <Button
//               size="lg"
//               text="Cancel"
//               onClick={() => {
//                 setShowWarningModal(!showWarningModal);
//               }}
//             />
//           </Box>
//           <Box padding={1}>
//             <Button
//               size="lg"
//               color="blue"
//               text={buttonText}
//               onClick={() => {
//                 proceedFunction();
//                 setShowWarningModal(!showWarningModal);
//               }}
//             />
//           </Box>
//         </Box>
//       }
//       role="alertdialog"
//       size="sm"
//     >
//       <Box paddingX={8}>
//         <Text align="center">{subtext}</Text>
//       </Box>
//     </Modal>
//   </Layer>
// );

// WarningModal.propTypes = {
//   showWarningModal: bool,
//   setShowWarningModal: func,
//   proceedFunction: func,
//   headingText: string.isRequired,
//   buttonText: string.isRequired,
//   subtext: string.isRequired,
// };

// WarningModal.defaultProps = {
//   showWarningModal: false,
//   setShowWarningModal: () => {},
//   proceedFunction: () => {},
// };

// export default WarningModal;
