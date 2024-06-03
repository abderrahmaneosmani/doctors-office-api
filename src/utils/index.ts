export const checkAvailableDate = (checkDate, start, end) => {
  const checkStartDate = new Date(checkDate);

  const startPatientDate = new Date(start);
  const endPatientDate = new Date(end);

  const patientHasAppointment =
    checkStartDate >= startPatientDate && checkStartDate <= endPatientDate;

  return patientHasAppointment;
};
