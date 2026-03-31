<x-mail::layout>
    {{-- Header --}}
    @isset($header)
        <x-slot:header>
            <x-mail::header :url="config('app.url')">
                {!! $header !!}
            </x-mail::header>
        </x-slot:header>
    @endisset

    {{-- Body --}}
    {!! $slot !!}

    {{-- Subcopy --}}
    @isset($subcopy)
        <x-slot:subcopy>
            <x-mail::subcopy>
                {!! $subcopy !!}
            </x-mail::subcopy>
        </x-slot:subcopy>
    @endisset

    {{-- Footer --}}
    @isset($footer)
        <x-slot:footer>
            <x-mail::footer>
                {!! $footer !!}
            </x-mail::footer>
        </x-slot:footer>
    @endisset
</x-mail::layout>
