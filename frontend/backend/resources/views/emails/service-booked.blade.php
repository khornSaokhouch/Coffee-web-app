<!-- In resources/views/emails/service-booked.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>New Booking Request</title>
</head>
<body>
    <h1>You Have a New Booking Request!</h1>
    <p>Hi {{ $booking->service->owner->name }},</p>
    <p>A user has requested to book one of your services. Here are the details:</p>
    <ul>
        <li><strong>Service:</strong> {{ $booking->service->name }}</li>
        <li><strong>Customer:</strong> {{ $booking->user->name }} ({{ $booking->user->email }})</li>
        <li><strong>Requested Date:</strong> {{ $booking->booking_date }}</li>
        <li><strong>Customer Notes:</strong> {{ $booking->notes ?? 'No notes provided.' }}</li>
    </ul>
    <p>You can accept or reject this booking through your dashboard.</p>
    <p>Thank you!</p>
</body>
</html>