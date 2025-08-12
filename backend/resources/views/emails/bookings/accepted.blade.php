@component('mail::message')
# Booking Accepted

Hi {{ $booking->user->name }},

Your booking for **{{ $booking->service->name }}** has been accepted.

Thank you for booking with us.

@endcomponent
